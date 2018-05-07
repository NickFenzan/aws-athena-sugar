// const recurringJobs = require('./recurring-jobs');
const athena = require('athena').connect();
// const sugar = require('sugar').connect();

var appointmentSet = [
  {
    date: '04/20/2018',
    copay: 0,
    appointmenttypeid: '2',
    appointmentid: '965243',
    appointmenttype: 'New Patient',
    starttime: '13:00',
    patientappointmenttypename: 'New Patient',
    departmentid: '1',
    providerid: '86',
    appointmentstatus: 'f'
  },
  {
    date: '05/10/2018',
    copay: 0,
    appointmenttypeid: '3',
    appointmentid: '965243',
    appointmenttype: 'Procedure',
    starttime: '14:00',
    patientappointmenttypename: 'Procedure',
    departmentid: '1',
    providerid: '86',
    appointmentstatus: 'f'
  }
];
athena.appointments.simplifyAppointmentSet(appointmentSet);
// recurringJobs.updatePatient(32525);


// var testPatient = {
//   "firstname": "Nick",
//   "lastname": "Test",
//   "dob": "01/01/1900",
//   "mobilephone": "2483449110",
//   "departmentid": "1"
// }
//
//
// athena.patients.find(testPatient)
//   .on('done',(res)=>{
//       console.log(res);
//   })
//   .on('error',(res)=>{
//       console.log(res);
//   })
// athena.patients.create(testPatient)
