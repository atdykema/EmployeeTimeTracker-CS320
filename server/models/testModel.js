//Mongodb Schema and models setup
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  action: {
    type: String
  },
});

const Test = mongoose.model('test', TestSchema);
module.exports = Test;