function successHandler(callback, data){
  try {
    callback(null,{
      statusCode:200,
      headers: { "Content-Type" : "application/json" },
      body:JSON.stringify(data)
    });
  } catch(e) {
    errorHandler()
  }
}

function errorHandler(callback, error) {
  try {
    var errorString = JSON.stringify(error);
    callback(errorString,{
      statusCode:500,
      headers: { "Content-Type" : "application/json" },
      body:errorString
    });
  } catch(e) {
    callback(errorString,{
      statusCode:500,
      headers: { "Content-Type" : "application/json" },
      body:error
    });
  }
}

let promiseResponse = function (promise, callback) {
  promise
  .then((data)=> {successHandler(callback,data)})
  .catch((err) => {errorHandler(callback,err)});
}

let emitterResponse = function (emitter, callback) {
  emitter
  .on('done',(res) => successHandler(callback,res))
  .on('error', (err) => errorHandler(callback, err))
}

exports.emitterResponse = emitterResponse;
exports.promiseResponse = promiseResponse;
