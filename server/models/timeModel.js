const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeEntrySchema = new Schema({
  "time" : {type: Number, required: true},
  "date" : {type: String, required: true},
});

const timeSchema = new Schema({
    "companyId" : {type: Number, required: true},
    "employeeId" : {type: Number, required: true},
    "timeEntries" : {type: [timeEntrySchema], required: true},
    // "timeEntries" : {any: Schema.Types.Mixed, required: true},
  });
  



  const Time = mongoose.model('employeetimeentries', timeSchema);
  // const TimeEntry = mongoose.model('employeetimeentries', timeEntrySchema);
  
  module.exports = Time;
  // module.exports = TimeEntry;