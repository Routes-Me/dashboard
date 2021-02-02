// const gapi = require('gapi');

//var GoogleAuth; // Google Auth object.


    // export function initializeGApi() {
    //     gapi.client.init({
    //         'apiKey': process.env.REACT_API_KEY,
    //         'clientId': process.env.REACT_APP_CLIENT_ID,
    //         'scope': 'https://www.googleapis.com/auth/androidmanagement',
    //         'discoveryDocs': ['https://androidmanagement.googleapis.com/$discovery/rest?version=v1']
    //     }).then(
    //         function () {
    //         GoogleAuth = gapi.auth2.getAuthInstance();
            
    //         // Listen for sign-in state changes.
    //         GoogleAuth.isSignedIn.listen(updateSigninStatus);
    //         },
    //         function(err) { 
    //             console.error("Error signing in", err); 
    //         });
    // }

    // function updateSigninStatus(){
      
    // }

  // export function loadClient() {
  //   gapi.client.setApiKey("YOUR_API_KEY");
  //   return gapi.client.load("https://androidmanagement.googleapis.com/$discovery/rest?version=v1")
  //       .then(function() { console.log("GAPI client loaded for API"); },
  //             function(err) { console.error("Error loading GAPI client for API", err); });
  // }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  // function execute() {
  //   return gapi.client.androidmanagement.enterprises.policies.list({
  //     "parent": "enterprises/LC02my9vtl"
  //   })
  //       .then(function(response) {
  //               // Handle the results here (response.result has the parsed body).
  //               console.log("Response", response);
  //             },
  //             function(err) { console.error("Execute error", err); });
  // }
  // gapi.load("client:auth2", function() {
  //   gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  // })