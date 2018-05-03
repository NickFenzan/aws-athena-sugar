let Practice = function(api) {
  this.departments = {
    list: () => api.GET('/departments'),
    get: (id) => api.GET(api.path_join('/departments',id))
  };
  this.referralSources = {
    list: () => api.GET('/referralsources')
  }
};

exports.module = Practice;
