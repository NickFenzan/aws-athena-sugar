const Client = require('node-rest-client').Client;

exports.Athena = function(client_id, client_secret, practice_id, mode="dev") {
  const rest = new Client();
  const CLIENT_ID = client_id;
  const CLIENT_SECRET = client_secret;
  const PRACTICE_ID = practice_id;
  const AUTH_URL_PREVIEW = "https://api.athenahealth.com/oauthpreview/token";
  const AUTH_URL_PRODUCTION = "https://api.athenahealth.com/oauth/token";
  const AUTH_URL = mode == "prod" ? AUTH_URL_PRODUCTION : AUTH_URL_PREVIEW;
  const BASE_URL_PREVIEW = "https://api.athenahealth.com/preview1/";
  const BASE_URL_PRODUCTION = "https://api.athenahealth.com/v1/";
  const BASE_URL = mode == "prod" ?
    BASE_URL_PRODUCTION + PRACTICE_ID
    : BASE_URL_PREVIEW + PRACTICE_ID;
  var access_token = "";

  var authorizedRequest = (method, path, args) => {
    let getNewAuthToken = function() {
      return new Promise((resolve, reject) => {
        let encodedCredentials = Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString('base64');
        let authRequest = {
          headers: {
            "Authorization": "Basic " + encodedCredentials,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: { grant_type:"client_credentials" }
        }
        rest.post(AUTH_URL, authRequest, (data,response) => {
          if(response.statusCode == 200) {
            access_token = data.access_token;
            resolve();
          } else {
            access_token = "";
            reject();
          }
        });
      })
    }
    let request = (method, path, args) => {
      let defaultAuthorizedHeaders = function() {
        return {
          headers: {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };
      }
      let fullPath = BASE_URL + path;
      return new Promise((resolve, reject) => {
        let defaultHandler = (data, response) => {
          switch(response.statusCode) {
            case 200:
              resolve(data);
              break;
            default:
              reject(data);
          }
        }
        let req = defaultAuthorizedHeaders();
        switch(method.toUpperCase()) {
          case "GET":
            rest.get(fullPath, req, defaultHandler);
            break;
          case "POST":
            req.data = args;
            console.log(req);
            rest.post(fullPath, req, defaultHandler);
            break;
          default:
            console.log('Unsupported method');
        }
      });
    }

    if(access_token == ""){
      return getNewAuthToken().then(() => request(method, path, args));
    } else {
      return request(method, path, args);
    }
  }

  this.patient = {
    create: function(patientData){
      return authorizedRequest("POST", "/patients", patientData);
    }
  }
  this.utility = {
    ping: function () {
      return authorizedRequest("GET", "/ping");
    }
  }
}
