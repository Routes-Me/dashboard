import { gapi, loadAuth2  } from 'gapi-script';
import { GApiConstants } from '../../constants/GApiConstants';

export function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/androidmanagement"})
      .then(function() { console.log("Sign-in successful"); execute();},
            function(err) { console.error("Error signing in", err); });
}

function loadClient() {
  gapi.client.setApiKey("AIzaSyBYsa7lx9_fPq0ydSxUt3rstnF_npYD1T4");
  return gapi.client.load("https://androidmanagement.googleapis.com/$discovery/rest?version=v1")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { alert(`Client Load API => Google Server Response : ${err.error.message}`);  console.error("Error loading GAPI client for API", err); });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return dispatch =>{
    dispatch(request());
    gapi.client.androidmanagement.enterprises.policies.list({
      "parent": "enterprises/LC02my9vtl"
    })
        .then(function(response) {
                dispatch(success(response.result.policies))
                console.log("Response", response);
              },
              function(err) { 
                alert(`Policies API => Google Server Response : ${err.error.message}`); 
                console.error("Execute error", err); 
              });
  }

}

gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "845237097697-uhu8sj7u875okiv9jbk1s3trvm6qcr13.apps.googleusercontent.com"});
});



function request() {
  return { type: GApiConstants.getPolicies_REQUEST }
}

function success(policies) {
  return { type: GApiConstants.getPolicies_SUCCESS, payload: policies}
}
