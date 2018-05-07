const athenahealthapi = require('./lib/athenahealthapi');
const AppointmentsModule = require('./lib/appointments.js').module;
const PatientsModule = require('./lib/patients.js').module;
const PracticeModule = require('./lib/practice.js').module;
const ReferringProvidersModule = require('./lib/referring-providers.js').module;
const UtilityModule = require('./lib/utility.js').module;

let Athena = function (
  client_id = process.env.ATHENA_CLIENT_ID,
  client_secret = process.env.ATHENA_CLIENT_SECRET,
  practice_id = process.env.ATHENA_PRACTICE_ID,
  version = process.env.ATHENA_API_VERSION
) {
  let api = new athenahealthapi.Connection(version, client_id, client_secret, practice_id);
  this.status = api.status;

  this.appointments = new AppointmentsModule(api);
  this.patients = new PatientsModule(api);
  this.practice = new PracticeModule(api);
  this.referringProviders = new ReferringProvidersModule(api);
  this.utility = new UtilityModule(api);

};



exports.connect = (client_id, client_secret, practice_id, version) => new Athena(client_id, client_secret, practice_id, version);
