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



//export router (used in index.js)
module.exports = router;