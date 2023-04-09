const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const timeSchema = new Schema({
    "companyId" : {type: Number, required: true},
    "employeeId" : {type: Number, required: true},
    // "timeEntries" : {type: [timeEntrySchema], required: true},
    "timeEntries" : [{
      "date" : String,
      "hoursWorked" : Number,
    }],
  });


  const Time = mongoose.model('employeetimeentries', timeSchema);
  
  module.exports = Time;
