const fs = require('fs'); // Node.js File System module

const lunchRock = 'mockData/LunchRock_LLC-time-entries.json';
const nightOwls = 'mockData/Night_Owls_Inc-time-entries.json';
const onionTech = 'mockData/Onion_Technology-time-entries.json';

// Read the input JSON file
const lunchRockData = JSON.parse(fs.readFileSync(lunchRock));
const nightOwlsData= JSON.parse(fs.readFileSync(nightOwls));
const onionTechData = JSON.parse(fs.readFileSync(onionTech));

// Reformat the JSON data

const HMSTimeToHours = (timeEntry) => {
    let inTime = timeEntry.clockedIn.split(':').map(val=>parseInt(val));
    let outTime = timeEntry.clockedOut.split(':').map(val=>parseInt(val));
    let hrsWorked = outTime[0]-inTime[0] + (1/60)*(outTime[1]-inTime[1]) + (1/3600)*(outTime[2]-inTime[2]);
    return Math.abs(Number(hrsWorked.toFixed(2)));
};

const millisecondDateToHours = (timeEntry) => {
    let dateIn = new Date(timeEntry.clockedInEpochMillisecond);
    let dateOut = new Date(timeEntry.clockedOutEpochMillisecond);
    let year = dateIn.getFullYear();
    let month = ("0" + (dateIn.getMonth() + 1)).slice(-2); // add leading zero to month
    let day = ("0" + dateIn.getDate()).slice(-2); // add leading zero to day
    let hours = dateOut.getHours()-dateIn.getHours();
    let minutes = dateOut.getMinutes()-dateIn.getMinutes();
    let seconds = dateOut.getSeconds()-dateIn.getSeconds();
    hrsWorked = hours + (1/60)*minutes + (1/3600)*seconds;
    return ({
        date: `${year}-${month}-${day}`,
        hoursWorked: Math.abs(Number(hrsWorked.toFixed(2))),
    });
};

const formatHMSTimeData = (timeData) => {
    return timeData.map(employeeTimeObj=> {
        return ({
            companyID: employeeTimeObj.companyId,
            employeeID: employeeTimeObj.employeeId,
            timeEntries: employeeTimeObj.timeEntries.map(timeEntry=> {
                return {
                    date: timeEntry.date,
                    hoursWorked: HMSTimeToHours(timeEntry),
                };
            })
        });
    });
};

const formatMilisecondTime = (timeData) => {
    return timeData.map(employeeTimeObj=> {
        return ({
            companyID: employeeTimeObj.companyId,
            employeeID: employeeTimeObj.employeeId,
            timeEntries: employeeTimeObj.timeEntries.map(timeEntry => millisecondDateToHours(timeEntry)),            
        })
    })
}

const lunchRockReformatted = formatHMSTimeData(lunchRockData);
const nightOwlsReformatted = formatHMSTimeData(nightOwlsData);
const onionTechDataReformatted = formatMilisecondTime(onionTechData);

// Write the reformatted data to the output JSON file

console.log(onionTechDataReformatted[0].timeEntries);

const lunchRockOutput = 'mockData/LunchRock_LLC-time-entries-reformatted.json';
const lunchRockNew = JSON.stringify(lunchRockReformatted);
fs.writeFileSync(lunchRockOutput, lunchRockNew);

const nightOwlsOutput = 'mockData/Night_Owls_Inc-time-entries-reformatted.json';
const nightOwlsNew = JSON.stringify(nightOwlsReformatted);
fs.writeFileSync(nightOwlsOutput, nightOwlsNew);

const onionTechOutput = 'mockData/Onion_Technology-time-entries-reformatted.json';
const onionTechNew = JSON.stringify(onionTechDataReformatted);
fs.writeFileSync(onionTechOutput, onionTechNew);

