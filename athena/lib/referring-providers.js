let ReferringProviders = function(api) {
  this.get = (id) => api.GET(api.path_join('/referringproviders', id))
  this.list = () => api.GET('/referringproviders');
  this.create = (fields) => api.POST('/referringproviders',fields)
  this.update = (fields) => api.PUT('/referringproviders',fields)

  this.changed = {
    results: (leaveUnprocessed = 'true') =>
      api.GET('/referringproviders/changed', {"params":{"leaveunprocessed":leaveUnprocessed}}),
    subscription: {
      get: () => api.GET('/referringproviders/changed/subscription'),
      create: () => api.POST('/referringproviders/changed/subscription'),
      delete: () => api.DELETE('/referringproviders/changed/subscription')
    }
  }

};

exports.module = ReferringProviders;
