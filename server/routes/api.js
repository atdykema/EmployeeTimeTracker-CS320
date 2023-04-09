//routing file: exports an express router
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Time = require('../models/timeModel');
const User = require('../models/userModel');
const Time = require('../models/timeModel');

const router = express.Router();
router.use(cors());
router.use(express.json());


router.post('/login', async (req, res, next) => {
    await User.findOne({email: req.body.username, password: req.body.password}).exec()
    .then(query=> {
        if (query) {
            //console.log(`\nUser ${req.body.username} found. Data:\n${query}`);
            res.status(200).send({response: "OK", value: query});
        } else {
            //console.log(`\nEither username ${req.body.username} or password ${req.body.password} incorrect`);
            res.status(404).send({response: "FAILURE"});
        }
    })
    .catch(error=> {
        console.log(`Failed. ${error}`);
        res.status(500).send({response: "FAILURE"});
    });
});


// GET TIME: get user time given the options
router.post('/user/time', async (req, res, next) => {
    // Default ALL timeEntries returned
    if(req.body.timeOption == "") {
        await Time.findOne({}, {companyId: req.body.companyId, employeeId: req.body.employeeId}).exec()
    .then(query=> {
        if (query) {
            console.log(`\nUser ${req.body.employeeId} found. Data:\n${query}`);
            res.send({response: "OK", value: query.timeEntries});
        } else {
            console.log(`\nEither companyId ${req.body.companyId} or employeeId ${req.body.employeeId} incorrect`);
            res.status(404).send({response: "FAILURE"});
        }
    })
    .catch(error=> {
        console.log(`Failed. ${error}`);
        res.status(500).send({response: "FAILURE"});
    });
    }

    else {
        let slice_num = 0;
        if(req.body.timeOption == "week") { slice_num = 7 }
        else if(req.body.timeOption == "month") { slice_num = 366; } // ALWAYS assume leap year, sort later
        else if(req.body.timeOption == "year") { slice_num = 1098; } // ALWAYS assume leap year, sort later
        else { res.status(500).send({response: "FAILURE: timeOption error."}); }

        

        await Time.findOne({}, {companyId: req.body.companyId, employeeId: req.body.employeeId, timeEntries: {$slice: slice_num} }).exec()
        .then(query=> {
            if (query) {                
                return_arr = [] // Return SUMs array
                const cur_date = new Date(); // Current time
                time_entries = query.timeEntries

                // Make sure they are in decending order
                // time_entries = time_entries.sort((a, b) => {
                //     const dateA = new Date(a.date);
                //     const dateB = new Date(b.date);
                //     return dateA - dateB; // switch the order to sort in opposite order
                // });


                /////////// Yearly SUM OF MONEY (3 recent years) //////////
                if(req.body.timeOption == "year") {
                    const three_year = [cur_date.getFullYear(), (cur_date.getFullYear())-1, (cur_date.getFullYear())-2]; // Three years

                    for(let i=0; i<3; i++) {
                        // Filter to entries of year X only
                        let entries_of_year_X = time_entries.filter((e) => {
                            const temp_date = new Date(e.date);
                            return temp_date.getFullYear() === three_year[i];
                        });
                        
                        console.log(entries_of_year_X)
                        return_arr.push(entries_of_year_X.reduce((partialSum, a) => partialSum + a.hoursWorked, 0));
                    }
                }
                /////////// Monthly SUM OF MONEY (This year's 12 months) //////////
                if(req.body.timeOption == "month") {
                    const this_year = cur_date.getFullYear();
                    console.log(this_year);                    

                    for(let i=0; i<12; i++) {         
                        // Filter to entries of this year only
                        let entries_of_month_X = time_entries.filter((e) => {
                            const date = new Date(e.date);
                            return date.getFullYear() === this_year && date.getMonth() === i+1;
                        });

                        return_arr.push(entries_of_month_X.reduce((partialSum, a) => partialSum + a.hoursWorked, 0));
                    }
                }
                /////////// Weekly SUM OF MONEY (Last 7 days) //////////
                if(req.body.timeOption == "week") {
                    var curr = new Date(); // get current date
                    curr.setFullYear(2023);
                    curr.setMonth(1, 1);
                    curr.setHours(0,0,0,0);

                    var firstday = new Date(curr);
                    firstday.setDate(curr.getDate()-curr.getDay()); // First day is the day of the month - the day of the week
                    var lastday = new Date(firstday); 
                    lastday.setDate(firstday.getDate()+6); // last day is the first day + 6

                    console.log(curr);
                    console.log(curr.getDate())
                    console.log(curr.getDay())
                    console.log(curr.getDate()-curr.getDay())
                    console.log(firstday);
                    console.log(lastday);


                    let entries_of_this_week = time_entries.filter((e) => {
                        const date = new Date(e.date);
                        return date.getTime() >= firstday.getTime() && date.getTime() < lastday.getTime();
                    });

                    console.log(entries_of_this_week);

                    var checking_date = new Date(firstday);
                    for(let i=0; i<7; i++) {
                        let hour_work = 0;

                        let found = entries_of_this_week.find((e) => {
                            const date = new Date(e.date);
                            return date.getDate() === checking_date.getDate() && date.getMonth() === checking_date.getMonth() && date.getFullYear() === checking_date.getFullYear();
                        })
                        
                        if(found) {
                            hour_work = found.hoursWorked;
                        }

                        return_arr.push(hour_work);
                        checking_date.setDate(checking_date.getDate()+1);

                    }


                
                }
                /////////// Send RESPONSE //////////
                
                // console.log(`\nUser ${req.body.employeeId} found. Data:\n${query}`);
                res.send({response: "OK", value: return_arr});

                
            } else {
                console.log(`\nEither companyId ${req.body.companyId} or employeeId ${req.body.employeeId} incorrect`);
                res.status(404).send({response: "FAILURE"});
            }
        })
        .catch(error=> {
            console.log(`Failed. ${error}`);
            res.status(500).send({response: "FAILURE"});
        });
    }
});

router.delete('/todos/:id', (req, res, next) => {
//TODO

router.post('/user/manage', async(req, res, next) => {
    company = req.body.companyName
    person = req.body
    queryList = []
    checkedList = []
    employees = []
    if(req.body.isManager){
        queryList.push(person)
    }
    while(queryList.length > 0){
        person = queryList.shift();
        checkedList.push(person.employeeId)
        await User.find({managerId: person.employeeId, companyName: company}).exec()
        .then(query=> {
            if(query){
                checkedList.push(person.employeeId)
                while(query.length > 0){
                    person = query.shift()
                    employees.push(person)
                    if(!checkedList.includes(person.employeeId)){
                        queryList.push(person)
                    }
                }
            }                
            
        })
    }
    res.send({response: "OK", value: employees});
});

router.post('/user/addTime', async(req, res, next) => {
    
    await Time.findOne({employeeId: req.body.employeeId, companyId:req.body.companyId}).exec().then(employee => {
        if(!employee){      
            return res.status(404).json({message: 'Employee not found'});
        } 
        for(const timedata of req.body.times){       
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


//export router (used in index.js)
module.exports = router;