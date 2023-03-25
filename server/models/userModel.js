const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "firstName": {type: String, required: true},
    "lastName": {type: String, required: true},
    "employeeId": {type: Number, required: true},
    "email": {type: String, required: true},
    "companyId": {type: Number, required: true},
    "companyName": {type: String, required: true},
    "positionTitle": {type: String, required: true},
    "startDate": {type: String, required: true},
    "isManager": {type: Boolean, required: true},
    "password": {type: String, required: true},
  });
  
  const User = mongoose.model('Employee', userSchema);
  module.exports = User;