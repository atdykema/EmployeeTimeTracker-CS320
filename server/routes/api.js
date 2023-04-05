//routing file: exports an express router
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Test = require('../models/testModel');
const User = require('../models/userModel');
const Time = require('../models/timeModel');

const router = express.Router();
router.use(cors());
router.use(express.json());

//routing
router.get('/todos', (req, res, next) => {
//TODO
});

// Create
router.post('/user/get', async (req, res, next) => {
    //uses user schema and 
    await User.findOne({email: req.body.username, password: req.body.password}).exec()
    .then(query=> {
        if (query) {
            console.log(`\nUser ${req.body.username} found. Data:\n${query}`);
            res.send({response: "OK", value: query});
        } else {
            console.log(`\nEither username "${req.body.username}" or password "${req.body.password}" incorrect`);
            res.status(404).send({response: "FAILURE"});
        }
    })
    .catch(error=> {
        console.log(`Failed. ${error}`);
        res.status(500).send({response: "FAILURE"});
    });
});

// GET TIME

router.post('/user/time', async (req, res, next) => {
    //uses user schema and 
    let slice_num = 0;
    if(req.body.timeOption == "year") { slice_num = 1095; }
    else if(req.body.timeOption == "month") { slice_num = 31; }
    else { slice_num = 7 }
    await Time.findOne({}, {companyId: req.body.companyId, employeeId: req.body.employeeId, timeEntries: {$slice: slice_num} }).exec()
    .then(query=> {
        if (query) {
            query = query.timeEntries;
            console.log(`\nUser ${req.body.employeeId} found. Data:\n${query}`);
            res.send({response: "OK", value: query});
        } else {
            console.log(`\nEither companyId ${req.body.companyId} or employeeId ${req.body.employeeId} incorrect`);
            res.status(404).send({response: "FAILURE"});
        }
    })
    .catch(error=> {
        console.log(`Failed. ${error}`);
        res.status(500).send({response: "FAILURE"});
    });
});

router.delete('/todos/:id', (req, res, next) => {
//TODO
});


//export router (used in index.js)
module.exports = router;