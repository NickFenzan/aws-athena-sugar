const emitterResponse = require('./sam-response').emitterResponse;
const athena = require('athena').connect();
const sugar = require('sugar').connect();

exports.handler = function(event, context, callback){
  emitterResponse(athena.utility.ping(),callback);
}

exports.createPatient = function(event, context, callback){
  let content = JSON.parse(event.body);
  emitterResponse(athena.patient.create(content), callback);
}

exports.createReferringProvider = function(event, context, callback){
  let content = JSON.parse(event.body);
  emitterResponse(athena.referringProvider.create(content), callback);
}
