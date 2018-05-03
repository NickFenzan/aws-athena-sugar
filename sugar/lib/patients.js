let Patients = function(api) {
  this.list = () => api.GET('/Leads');

}

exports.module = Patients;
