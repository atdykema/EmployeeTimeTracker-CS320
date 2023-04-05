//routing file: exports an express router
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Time = require('../models/timeModel');
const User = require('../models/userModel');

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

router.post('/user/time')

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