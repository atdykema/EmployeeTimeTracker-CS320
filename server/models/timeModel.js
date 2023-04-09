const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    "employeeId": {type: Number, required: true},
    "companyId": {type: Number, required: true},
    "timeEntries": [{
        "date":String,
        "hoursWorked":Number
    }]
});
  
const Time = mongoose.model('employeetimeentries', timeSchema);
module.exports = Time;

