let Appointments = function(api) {
  this.changed = {
    results: (leaveUnprocessed = 'true') =>
      api.GET('/appointments/changed', {"params":{"leaveunprocessed":leaveUnprocessed}}),
    subscription: {
      get: () => api.GET('/appointments/changed/subscription'),
      create: () => api.POST('/appointments/changed/subscription'),
      delete: () => api.DELETE('/appointments/changed/subscription')
    }
  }
}

exports.module = Appointments;
