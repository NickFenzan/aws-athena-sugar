const Athena = require('athena').Athena;

const ATHENA_CLIENT_ID = process.env.ATHENA_CLIENT_ID;
const ATHENA_CLIENT_SECRET = process.env.ATHENA_CLIENT_SECRET;
const ATHENA_PRACTICE_ID = process.env.ATHENA_PRACTICE_ID;

const athena = new Athena(ATHENA_CLIENT_ID, ATHENA_CLIENT_SECRET, ATHENA_PRACTICE_ID);

exports.handler = function(event, context, callback){
  athena.utility.ping().then(()=>{
    athena.utility.ping().then(()=>{
      athena.utility.ping().then((data)=> {
        let response = {
          statusCode: 200,
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify(data)
        };
        callback(null,response);
      })
      .catch((err) => {
        console.log("Error");
        console.log(err);
        callback(null,{statusCode: 500, body: err});
      });
    });
  });

}

var patientData = {
  'firstname': 'Nick',
  'lastname': 'Testt',
  'departmentid': 1,
  'dob': '08/09/1988',
  'homephone': '2483449110'
}

athena.patient.create(patientData)
.then((data)=>{
  console.log(data);
})
.catch((err)=>{
  console.log(err);
});
