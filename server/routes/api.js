//routing file: exports an express router
const express = require('express');
const router = express.Router();
const Test = require('../models/testModel');

//routing
router.get('/todos', (req, res, next) => {
//TODO
});
router.post('/todos', (req, res, next) => {
//TODO
});
router.delete('/todos/:id', (req, res, next) => {
//TODO
});

//export router (used in index.js)
module.exports = router;