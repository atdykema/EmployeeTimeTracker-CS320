const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeEntry = new Schema({
    "date": {type: String, required: true},
    "hoursWorked": {type: Number, required: true}
});

const timeSchema = new Schema({
    "employeeId": {type: Number, required: true},
    "companyId": {type: Number, required: true},
    "timeEntries": {type: [timeEntry], required: true}
});
  
const Time = mongoose.model('Employeetimeentrie', timeSchema);
module.exports = Time;