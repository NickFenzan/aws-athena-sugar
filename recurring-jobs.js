const athena = require('athena').connect()
const sugar = require('sugar').connect()

let updatePatient = function(patientId){
  var patient;

  athena.patients.get(patientId)
    .on('done', (patientRes) => {
      patient = patientRes[0];
      athena.patients.appointments.list(patientId)
        .on('done', (appointmentRes) => {
          patient.appointments = appointmentRes.appointments;
          athena.patients.encounters.list(patientId)
            .on('done', (encounterRes) => {
              patient.encounters = encounterRes.encounters;
              console.log(patient);
            })
            .on('error', (e)=>console.log(e));
        }).on('error', (e)=>console.log(e));
    }).on('error', (e)=>console.log(e));


}

exports.updatePatient = updatePatient;
