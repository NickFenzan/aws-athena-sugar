let Utility = function(api) {
  this.ping = () => api.GET('/ping');

}

exports.module = Utility;
