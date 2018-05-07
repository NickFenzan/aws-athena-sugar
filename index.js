const emitterResponse = require('./sam-response').emitterResponse;
const athena = require('athena').connect();
const sugar = require('sugar').connect();

exports.handler = function(event, context, callback){
  emitterResponse(athena.utility.ping(),callback);
}

exports.createPatient = function(event, context, callback){
  let request = JSON.parse(event.body);
  emitterResponse(athena.patients.create(request), callback);
}

exports.getPatient = function(event, context, callback) {
  let patientId = event.pathParameters.patientId;
  emitterResponse(athena.patients.get(patientId),callback);
}

exports.createReferringProvider = function(event, context, callback){
  let request = JSON.parse(event.body);
  emitterResponse(athena.referringProviders.create(request), callback);
}

exports.getReferringProvider = function(event, context, callback){
  let referringProviderId = event.pathParameters.referringProviderId;
  emitterResponse(athena.referringProviders.get(referringProviderId), callback);
}
