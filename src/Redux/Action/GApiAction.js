import { gapi, loadAuth2  } from 'gapi-script';
import { GApiConstants } from '../../constants/GApiConstants';

export function authenticate() {
  console.log('EMM ::: Authentication Request!!!!')
  return dispatch => {
    dispatch(authorizationRequest());
    gapi.auth2.getAuthInstance()
    .signIn({scope: "https://www.googleapis.com/auth/androidmanagement"})
    .then(function() { 
        console.log("EMM ::: Sign-in successful :::");
        dispatch(authorized(gapi)); 
    },
    function(err) { 
        console.error("EMM ::: Error signing in ::: ", err); alert("Seems like authentication failed!!" + err.error.message);
        dispatch(authorizationError()); 
    });
  } 

  function authorizationRequest() { return { type: GApiConstants.authorization_REQUEST }; }
  function authorized(gapi) { return {type: GApiConstants.authorization_SUCCESS, payload:gapi }; }
  function authorizationError() { return {type: GApiConstants.authorization_ERROR}; }
}

function loadClient() {
  gapi.client.setApiKey("AIzaSyBYsa7lx9_fPq0ydSxUt3rstnF_npYD1T4");
  return gapi.client.load("https://androidmanagement.googleapis.com/$discovery/rest?version=v1")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { alert(`Client Load API => Google Server Response : ${err.error.message}`); 
            console.error("Error loading GAPI client for API", err); });
}

export function createWebToken() {

  console.log("EMM ::: <=== Web Token Creation Request ===>")
  return dispatch => {
    dispatch(requestWebToken());
    gapi.client.androidmanagement.enterprises.webTokens.create({
      "parent": "enterprises/LC02my9vtl",
      "resource": {
      "parentFrameUrl": "https://stage.dashboard.routesme.com"
      }
    })
    .then(function(response) {
            console.log("EMM ::: WebToken Response :::", response.result.value);
            dispatch(returnWebToken(response.result.value));
        },
          function(err) { 
            console.error("EMM ::: WebToken Error :::", err);
            dispatch(requestWebTokenError());
        });
  }

  function requestWebToken() { return {type: GApiConstants.createWebToken_REQUEST};}
  function returnWebToken(token) { return {type: GApiConstants.createWebToken_SUCCESS, payload:token };}
  function requestWebTokenError() {return {type: GApiConstants.createWebToken_ERROR};}
}



// Make sure the client is loaded and sign-in is complete before calling this method.
export function getPolicies() {

  console.log('EMM ::: <=== List policies Request ===>')

  return dispatch => {
    dispatch(requestPolicies());
    gapi.client.androidmanagement.enterprises.policies.list({
      "parent": "enterprises/LC02my9vtl"
    })
    .then(function(response) {
          dispatch(returnPolicies(response.result.policies))
          console.log("EMM ::: Policies Response :::", response);
        },
          function(err) { 
            alert(`Policies API => Google Server Response : ${err.error.message}`); 
            console.error("EMM ::: Policies error :::", err); 
            dispatch(requestPoliciesError());
        });
  }

  function requestPolicies() { return {type: GApiConstants.getPolicies_REQUEST};}
  function returnPolicies(policies) { return {type: GApiConstants.getPolicies_SUCCESS, payload:policies};}
  function requestPoliciesError() { return {type: GApiConstants.getPolicies_ERROR};}

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
