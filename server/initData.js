const fs = require('fs'); // Node.js File System module
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: 'process.env'});

const lunchRock = 'mockData/LunchRock_LLC-time-entries.json';
const nightOwls = 'mockData/Night_Owls_Inc-time-entries.json';
const onionTech = 'mockData/Onion_Technology-time-entries.json';
const gizmoGram = 'mockData/GizmoGram-time-entries.json';

//IDs from the employee object data
const gizmoGramId = 3;
const nightOwlsId = 1;
const onionTechId = 4;
const lunchRockId = 2;

// Read the input JSON file
let lunchRockData = JSON.parse(fs.readFileSync(lunchRock));
let nightOwlsData= JSON.parse(fs.readFileSync(nightOwls));
let onionTechData = JSON.parse(fs.readFileSync(onionTech));
let gizmoGramData = JSON.parse(fs.readFileSync(gizmoGram));

// Reformat hour minute second data for single timeEntry object (one employee on one day)
// accounts for daylight savings time and overnight shifts
const HMSTimeToHours = (timeEntry) => {
    let inTime = timeEntry.clockedIn.split(':').map(val=>parseInt(val));
    let outTime = timeEntry.clockedOut.split(':').map(val=>parseInt(val));
    //value from 0-24 in hours that represents when in the day they clocked in/out
    let inHrs = inTime[0] + (1/60)*inTime[1] + (1/3600)*inTime[2];
    let outHrs = outTime[0] + (1/60)*outTime[1] + (1/3600)*outTime[2];
    //simply put did they work past midnight
    let nightShift = inHrs > outHrs;
    //hours elapsed depending on if its a night shift
    let hrsWorked = nightShift? 24 - inHrs + outHrs: outHrs - inHrs;
    //if worked through daylight savings shift (only one relevant throughout data is 2022-11-06) then add lost hour
    hrsWorked += nightShift && timeEntry.date === "2022-11-06" && outHrs >= 1? 1 : 0;

    return Number(hrsWorked.toFixed(2));
};

//formats millisecond data for single timeEntry object (one employee on one day)
const millisecondDateToHours = (timeEntry) => {
    let dateIn = new Date(timeEntry.clockedInEpochMillisecond);
    let year = dateIn.getFullYear();
    let month = ("0" + (dateIn.getMonth() + 1)).slice(-2); // add leading zero to month
    let day = ("0" + dateIn.getDate()).slice(-2); // add leading zero to day
    hrsWorked = (timeEntry.clockedOutEpochMillisecond - timeEntry.clockedInEpochMillisecond)/3600000;
    return ({
        date: `${year}-${month}-${day}`,
        hoursWorked: Number(hrsWorked.toFixed(2)),
    });
};

//formats the hours minutes second time data for all objects in a single array
const formatHMSTimeData = (timeData) => {
    return timeData.map(employeeTimeObj=> {
        return ({
            companyId: employeeTimeObj.companyId,
            employeeId: employeeTimeObj.employeeId,
            timeEntries: employeeTimeObj.timeEntries.map(timeEntry=> {
                return {
                    date: timeEntry.date,
                    hoursWorked: HMSTimeToHours(timeEntry),
                };
            })
        });
    });
};

//formats the epoch millisecond time as hoursworked for all objects in a single array
const formatMilisecondTime = (timeData) => {
    return timeData.map(employeeTimeObj=> {
        return ({
            companyId: employeeTimeObj.companyId,
            employeeId: employeeTimeObj.employeeId,
            timeEntries: employeeTimeObj.timeEntries.map(timeEntry => millisecondDateToHours(timeEntry)),            
        })
    })
};

//so we can actually use the companyID
const changeCompanyID = (employeeTimeObj, companyId) => ({
    ...employeeTimeObj, companyId: companyId,
});

//assumes data has been converted to hrsWorked, combines entries for the same day, adding hours worked for both days
const combineDuplicateDays = (employeeTimeObj) => {
    let newTimeEntries = [];
    employeeTimeObj.timeEntries.forEach(timeEntry => {
        let existing = newTimeEntries.find(newTimeEntry=>newTimeEntry.date===timeEntry.date)
        if (existing !== undefined) {
            existing.hoursWorked += timeEntry.hoursWorked;
            existing.hoursWorked = Number(existing.hoursWorked.toFixed(2));
        } else {
            newTimeEntries.push(timeEntry);
        }
    })
    return ({
        ...employeeTimeObj, 
        timeEntries: newTimeEntries,
    });
};

lunchRockData = formatHMSTimeData(lunchRockData)
                .map(employee=>changeCompanyID(employee, lunchRockId))
                .map(employee=>combineDuplicateDays(employee));
nightOwlsData = formatHMSTimeData(nightOwlsData).map(employee=>changeCompanyID(employee, nightOwlsId));
onionTechData = formatMilisecondTime(onionTechData).map(employee=>changeCompanyID(employee,onionTechId));
gizmoGramData = gizmoGramData.map(employee=>changeCompanyID(employee, gizmoGramId));

// Write the reformatted data to the output JSON file

//write files to the mockData folder if you wish
const writeFiles = () => {
    const lunchRockOutput = 'mockData/LunchRock_LLC-time-entries-reformatted.json';
    fs.writeFileSync(lunchRockOutput, JSON.stringify(lunchRockData));

    const nightOwlsOutput = 'mockData/Night_Owls_Inc-time-entries-reformatted.json';
    fs.writeFileSync(nightOwlsOutput, JSON.stringify(nightOwlsData));

    const onionTechOutput = 'mockData/Onion_Technology-time-entries-reformatted.json';
    fs.writeFileSync(onionTechOutput, JSON.stringify(onionTechData));

    const gizmoGramOutput = 'mockData/GizmoGram-time-entries-reformatted.json';
    fs.writeFileSync(gizmoGramOutput, JSON.stringify(gizmoGramData));
}

//temporary until timeSchema file gets added
const timeSchema = new mongoose.Schema({
    "employeeId": {type: Number, required: true},
    "companyId": {type: Number, required: true},
    "timeEntries": [{
        date: {type: String, required: true},
        hoursWorked: {type: Number, required: true},
    }],
});
  
const timeEntries = mongoose.model('employeetimeentries', timeSchema);

//run to upload files to database
const uploadFilesToDB = async  () => {
    mongoose
    .connect(process.env.DB.toString(), { useNewUrlParser: true })
    .then(() => {
        console.log(`Database connected successfully`);
    })
    .catch((err) => console.log(err));
    mongoose.Promise = global.Promise;

    await timeEntries.deleteMany({});

    const allData = [...gizmoGramData, ...lunchRockData, ...nightOwlsData, ...onionTechData];
    await timeEntries.insertMany(allData);
    mongoose.disconnect();
};
uploadFilesToDB();