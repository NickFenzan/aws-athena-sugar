const sugarcrmapi = require('./lib/sugarcrmapi');
const PatientsModule = require('./lib/patients').module;
const UtilityModule = require('./lib/utility').module;

let Sugar = function(
  client_id = process.env.SUGAR_CLIENT_ID,
  client_secret = process.env.SUGAR_CLIENT_SECRET
) {
  let api = new sugarcrmapi.Connection(client_id, client_secret);
  this.status = api.status;

  this.patients = new PatientsModule(api);
  this.utility = new UtilityModule(api);
}

exports.connect = (client_id, client_secret) => new Sugar(client_id, client_secret);
