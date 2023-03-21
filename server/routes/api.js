//routing file: exports an express router
const express = require('express');
const router = express();
const Test = require('../models/testModel');

const cors = require('cors');
router.use(cors());
router.use(express.json());

//routing
router.get('/todos', (req, res, next) => {
//TODO
});
router.post('/user/get', (req, res, next) => {
    console.log("hello world");
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    //console.log(req.body.username+' '+req.body.password);
    res.send({value: "OK"});

//TODO
});
router.delete('/todos/:id', (req, res, next) => {
//TODO
});

router.listen(3000, ()=> {console.log("listening on port 3000")});

//export router (used in index.js)
module.exports = router;