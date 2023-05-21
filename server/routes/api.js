//routing file: exports an express router
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Time = require('../models/timeModel');
const User = require('../models/userModel');
const TokenContainer = require('../models/tokenModel');

const router = express.Router();
router.use(cors());
router.use(express.json());

function generateUniqueHexCode() {
    const timestamp = Date.now().toString(16); // Get current timestamp as hexadecimal
    const randomNum = Math.floor(Math.random() * 10000).toString(16); // Generate random number as hexadecimal
    const uniqueCode = timestamp + randomNum; // Concatenate the timestamp and random number
    return uniqueCode;
}

async function createToken(employeeId, companyId) {
    const newToken = generateUniqueHexCode();
    const tokenContainer = await TokenContainer.findOne({employeeId: employeeId, companyId: companyId});
    if (tokenContainer) {
        tokenContainer.tokens.push(newToken);
        tokenContainer.markModified();
        await tokenContainer.save();
    } else {
        const newTokenContainer = new TokenContainer({employeeId: employeeId, companyId: companyId, tokens: [newToken]})
        await newTokenContainer.save();
    }
    return newToken;
}

async function validateToken(employeeId, companyId, token) {
    const tokenContainer = await TokenContainer.findOne({employeeId: employeeId, companyId: companyId});
    if (tokenContainer) {
        return tokenContainer.tokens.includes(token);
    }
    return false;
}

async function deleteToken(employeeId, companyId, token) {
    const tokenContainer = await TokenContainer.findOne({employeeId: employeeId, companyId: companyId});
    tokenContainer.tokens = tokenContainer.tokens.filter(foundToken => foundToken !== token);
    tokenContainer.markModified();
    await tokenContainer.save();
}

async function isSubordinate(employeeId, subordinateId, companyId) {
    return true;
}

router.post('/login', async (req, res, next) => {
    await User.findOne({email: req.body.username, password: req.body.password}).exec()
    .then(async (query) => {
        if (query) {
            // console.log(`\nUser ${req.body.username} found. Data:\n${query}`);
            let newToken = await createToken(query.employeeId, query.companyId);
            res.status(200).send({response: "OK", value: query, token: newToken});
        } else {
            // console.log(`\nEither username ${req.body.username} or password ${req.body.password} incorrect`);
            res.status(404).send({response: "FAILURE"});
        }
    })
    .catch(error=> {
        console.log(`Failed. ${error}`);
        res.status(500).send({response: "FAILURE"});
    });
});

router.post('/employeeGet', async (req, res, next) => {
    if (!(await validateToken(req.body.employeeId, req.body.companyId, req.body.token))) {
        res.status(401).send({response: "FAILURE"});
        return;
    }
    let searchId = req.body.employeeId;
    if (req.body.subordinateId) {
        if (await isSubordinate(req.body.subordinateId, req.body.employeeId, req.body.companyId)) {
            searchId = req.body.subordinateId;
        } else {
            res.status(401).send({response: "FAILURE"});
            return;
        }
    }
    await User.findOne({employeeId: searchId, companyId: req.body.companyId}).exec()
    .then(query=> {
        if (query) {
            res.status(200).send({response: "OK", value: query});
        } else {
            res.status(404).send({response: "FAILURE"});
        }
    })
    .catch(error=> {
        // console.log(`Failed. ${error}`);
        res.status(500).send({response: "FAILURE"});
    });
});


// GET TIME: get user time given the options
router.post('/user/time', async (req, res, next) => {
    if (!(await validateToken(req.body.employeeId, req.body.companyId, req.body.token))) {
        res.status(401).send({response: "FAILURE"});
        return;
    }
    let data = await getTimeData(req, res);
    if (data) {
        res.send(data);
    } 
});

//used for /user/time and /aggregateData routes
async function getTimeData(req, res) {
    let successResult = null;
    let searchId = req.body.employeeId;
    if (req.body.subordinateId) {
        if (await isSubordinate(req.body.subordinateId, req.body.employeeId, req.body.companyId)) {
            searchId = req.body.subordinateId;
        } else {
            res.status(401).send({response: "FAILURE"});
            return null;
        }
    }
    // Default ALL timeEntries returned
    if(req.body.timeOption == "") {
        await Time.findOne({companyId: req.body.companyId, employeeId: searchId}).exec()
    .then(query=> {
        if (query) {
            // console.log(`\nUser ${req.body.employeeId} found. Data:\n${query}`);
            successResult = {response: "OK", value: query.timeEntries};
        } else {
            // console.log(`\nEither companyId ${req.body.companyId} or employeeId ${req.body.employeeId} incorrect`);
            res.status(404).send({response: "FAILURE"});
        }
    })
    .catch(error=> {
        // console.log(`Failed. ${error}`);
        res.status(500).send({response: "FAILURE"});
    });
    }

    else {
        await Time.findOne({companyId: req.body.companyId, employeeId: searchId}).exec()
        .then(query=> {
            if (query) {                
                return_arr = [] // Return SUMs array
                const cur_date = new Date(); // Current time
                time_entries = query.timeEntries

                // Make sure they are in decending order
                time_entries = time_entries.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA - dateB; // Least to Most recent
                });


                /////////// Yearly SUM OF MONEY (3 recent years) //////////
                if(req.body.timeOption == "year") {
                    const three_year = [cur_date.getUTCFullYear(), (cur_date.getUTCFullYear())-1, (cur_date.getUTCFullYear())-2]; // Three years

                    for(let i=0; i<3; i++) {
                        // Filter to entries of year X only
                        let entries_of_year_X = time_entries.filter((e) => {
                            const temp_date = new Date(e.date);
                            temp_date.setUTCHours(0,0,0,0);
                            return temp_date.getUTCFullYear() === three_year[i];
                        });
                        
                        return_arr.push(Number((entries_of_year_X.reduce((partialSum, a) => partialSum + a.hoursWorked, 0)).toFixed(2)));
                    }
                }
                /////////// Monthly SUM OF MONEY (This year's 12 months) //////////
                if(req.body.timeOption == "month") {
                    const this_year = cur_date.getUTCFullYear();

                    for(let i=0; i<12; i++) {         
                        // Filter to entries of this year only
                        let entries_of_month_X = time_entries.filter((e) => {
                            const date = new Date(e.date);
                            date.setUTCHours(0,0,0,0);
                            return date.getUTCFullYear() === this_year && date.getUTCMonth() === i;
                        });

                        return_arr.push(Number((entries_of_month_X.reduce((partialSum, a) => partialSum + a.hoursWorked, 0)).toFixed(2)));
                    }
                }
                /////////// Weekly SUM OF MONEY (Last 7 days) //////////
                if(req.body.timeOption == "week") {
                    var curr = new Date(); // get current date
                    // curr.setFullYear(2023);  // For test/demo
                    // curr.setMonth(1, 1);
                    curr.setUTCHours(0,0,0,0);

                    var firstday = new Date(curr);
                    firstday.setUTCDate(curr.getUTCDate()-curr.getUTCDay()); // First day is the day of the month - the day of the week
                    var lastday = new Date(firstday); 
                    lastday.setUTCDate(firstday.getUTCDate()+7); // last day is the first day + 6

                    let entries_of_this_week = time_entries.filter((e) => {
                        const date = new Date(e.date);
                        date.setUTCHours(0,0,0,0);
                        // return date.getUTCTime() >= firstday.getUTCTime() && date.getUTCTime() < lastday.getUTCTime();
                        return date >= firstday && date < lastday;
                    });

                    var checking_date = new Date(firstday);
                    checking_date.setUTCHours(0,0,0,0);
                    
                    for(let i=0; i<7; i++) {
                        let hour_work = 0;

                        let found = entries_of_this_week.find((e) => {
                            const entry_date = new Date(e.date);
                            entry_date.setUTCHours(0,0,0,0);

                            return entry_date.toUTCString() === checking_date.toUTCString();
                        })
                        
                        if(found) {
                            hour_work = found.hoursWorked;
                        }

                        return_arr.push(hour_work);
                        checking_date.setUTCDate(checking_date.getUTCDate()+1);

                    }


                
                }

                /////////// Custom Time entries //////////
                if(req.body.timeOption == "custom") {
                    const startDate = new Date(req.body.startDate);
                    const endDate = new Date(req.body.endDate);
                    startDate.setUTCHours(0,0,0,0);
                    endDate.setUTCHours(0,0,0,0);

                    return_arr = time_entries.filter((e) => {
                        const date = new Date(e.date);
                        date.setUTCHours(0,0,0,0);
                        return date >= startDate && date < endDate;
                    });
                    
                }

                /////////// Send RESPONSE //////////
                
                ////console.log(`\nUser ${req.body.employeeId} found. Data:\n${query}`);
                successResult = {response: "OK", value: return_arr};

                
            } else {
                ////console.log(`\nEither companyId ${req.body.companyId} or employeeId ${req.body.employeeId} incorrect`);
                res.status(404).send({response: "FAILURE"});
            }
        })
        .catch(error=> {
            ////console.log(`Failed. ${error}`);
            res.status(500).send({response: "FAILURE"});
        });
    }

    return successResult;
}

router.post('/user/manage', async(req, res, next) => {
    if (!(await validateToken(req.body.employeeId, req.body.companyId, req.body.token))) {
        res.status(401).send({response: "FAILURE"});
        return;
    }
    let result = await getSubordinates(req, res);
    res.send(result);
});

//used for /user/manage and /aggregateData routes
async function getSubordinates(req, res) {
    try {
        const company = req.body.companyName
        let person = req.body
        let queryList = []
        const checkedList = []
        const employees = []
        if(req.body.isManager){
            queryList.push(person)
        }
        while(queryList.length > 0){
            const addSubs = async (person) => {
                // person = queryList.shift();
                checkedList.push(person.employeeId)
                await User.find({managerId: person.employeeId, companyName: company}).exec()
                .then(query=> {
                    if(query.length > 0){
                        checkedList.push(person.employeeId)
                        while(query.length > 0) {
                            person = query.shift()
                            employees.push(person)
                            if(!checkedList.includes(person.employeeId)){
                                queryList.push(person)
                            }
                        }
                    }             
                })
            }
            let promiseArray = queryList.map(e=>addSubs(e));
            queryList = [];
            await Promise.all(promiseArray);
        }
        return {response: "OK", value: employees};
    }
    catch (e) {
        res.send({response:"FAILURE"});
    }

}

router.post('/user/addTime', async(req, res, next) => {  
    if (!(await validateToken(req.body.employeeId, req.body.companyId, req.body.token))) {
        res.status(401).send({response: "FAILURE"});
        return;
    }
    await Time.findOne({employeeId: req.body.employeeId, companyId:req.body.companyId}).exec().then(employee => {
        if(!employee){      
            return res.status(404).json({message: 'Employee not found'});
        } 
        for(const timedata of req.body.times){   
            filtered = employee.timeEntries.filter(e => e.date === timedata.date);
            if(filtered.length>0){
                index = employee.timeEntries.indexOf(filtered[0])
                employee.timeEntries[index].hoursWorked = timedata.hoursWorked;
                continue
            }         
            employee.timeEntries.push({
                "date": timedata.date,
                "hoursWorked": timedata.hoursWorked
            });      
        } 
        employee.markModified('timeEntries'); 
        employee.save().then(updatedTime => {
            res.json(updatedTime);
        }).catch(err => {
            res.status(500).json({message: 'failed to update user', error: err});
        });
    }).catch(err => {
        res.status(500).json({ message: 'Failed to find user', error: err });
    })
    
});

//route to get aggregateDate, works exactly the same as /user/time except returns aggregated time values for
//all employees under the one specified in req.body
router.post('/aggregateData', async(req, res, next) => {
    if (!(await validateToken(req.body.employeeId, req.body.companyId, req.body.token))) {
        res.status(401).send({response: "FAILURE"});
        return;
    }
    //get array of employees under one specified in req.body
    let employees = await getSubordinates(req, res);
    employees = employees.value;
    if (employees.length === 0) {
        res.send({response: "FAILURE"});
        return;
    }
    let aggregateData = null;

    const addEmployeeData = async (employee) => {
        //req object to pass to getTimeData
        let pseudoReq = {body: {
            employeeId: employee.employeeId,
            companyId: employee.companyId,
            timeOption: req.body.timeOption,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }};
        let data = await getTimeData(pseudoReq, res);
        data = data.value;
        //if aggregateData is null init to first value of data retrieved
        if (!aggregateData) {
            aggregateData = data.map(x=>x);
        }
        //if one of the summarized time options
        else if (req.body.timeOption !== "" && req.body.startDate === undefined && req.body.endDate === undefined) {
            data.forEach((val, i)=>{aggregateData[i]+= Number(val)});
        }
        //if no options specified or range specified
        else {
            data.forEach((entry) => {
                let existingIndex = aggregateData.findIndex(existingEntry=> existingEntry.date === entry.date);
                if (entry.hoursWorked <= 24){
                    if (existingIndex >= 0) {
                        aggregateData[existingIndex].hoursWorked += entry.hoursWorked;
                    } else {
                        aggregateData.push(entry);
                    }
                }
            }) 
        }   

    }
    await Promise.all(employees.map(e=> addEmployeeData(e)));
    aggregateData.sort((e1,e2) => new Date(e1.date) - new Date(e2.date));
    res.send({response: "OK", value: aggregateData});
})

router.post('/logout', async(req, res, next) => {
    await deleteToken(req.body.employeeId, req.body.companyId, req.body.token);
    res.status(200).send({response: "OK"});
});

//export router (used in index.js)
module.exports = router;