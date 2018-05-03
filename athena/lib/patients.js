let Patients = function(api) {
  this.get = (id) => api.GET(api.path_join('/patients', id))
  this.search = (term) => api.GET('/patients/search',{"params":{"searchterm":term}});
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
