let Patients = function(api) {
  this.get = (id) => api.GET(api.path_join('/patients', id))
  this.search = (term) => api.GET('/patients/search',{"searchterm":term});
  this.find = (fields) => api.GET('/patients', fields)
  this.create = (fields) => api.POST('/patients',fields)
  this.appointments = {
    list: (patientId) => api.GET(
      api.path_join('/patients',patientId,'appointments'),
      {"showcancelled":"Y","showpast":"Y"}
    ),
    get: (patientId, appointmentId) => api.GET(
      api.path_join('/patients',patientId,'/appointments',appointmentId)
    )
  }
  this.encounters = {
    list: (patientId) => api.GET(api.path_join('/chart',patientId,'/encounters'),{"departmentid":"1"}),
    get: (encounterId) => api.GET(api.path_join('/chart/encounter',encounterId))
  }
  this.changed = {
    results: (leaveUnprocessed = 'true') =>
      api.GET('/patients/changed', {"params":{"leaveunprocessed":leaveUnprocessed}}),
    subscription: {
      get: () => api.GET('/patients/changed/subscription'),
      create: () => api.POST('/patients/changed/subscription'),
      delete: () => api.DELETE('/patients/changed/subscription')
    }
  }

};

exports.module = Patients;
