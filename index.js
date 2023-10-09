// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
  }


function createTimeInEvent(employeeRecord, dateTime) {
    const [date, time] = dateTime.split(" ");
    const [hour, minute] = time.split(":");
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour + minute),
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}
  

function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, time] = dateTime.split(" ");
    const [hour, minute] = time.split(":");
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt(hour + minute),
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}



function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date);
  
    const timeIn = timeInEvent.hour;
    const timeOut = timeOutEvent.hour;
  
    return (timeOut - timeIn) / 100;
}
  

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}
  
  
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
}
  
  
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
}