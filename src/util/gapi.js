import { refineObject } from './basic';
import { inLog, outLog } from './CustomLogging';
class GapiRequest {

    constructor() {
        this.GAPI = window.gapi;
        this.loadAuthClient();
        console.log('Window context loaded onto this')
    }


    loadAuthClient = () => {
        this.GAPI.load("client:auth2", function () {
            window.gapi.auth2.init({ client_id: process.env.REACT_APP_GAPI_CLIENTID });
            console.log('Script loaded !!')
        });
    }

    authorize = () => {
        inLog('EMM', 'Authorize Request')

        return this.GAPI.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/androidmanagement" })
            .then(function () {
                outLog('EMM', 'Authorized!!');
            },
                function (err) {
                    outLog('EMM', `Authorization Error: ${err}`); alert("Seems like authentication failed!!" + err.error.message);
                });

    }

    loadClient = () => {
        inLog('EMM', 'Loading Client....');
        return this.GAPI.client.load("https://androidmanagement.googleapis.com/$discovery/rest?version=v1")
            .then(function () {
                outLog('EMM', 'GAPI client loaded for API');
            },
                function (err) { alert(`Client Load API ===> Google Server Response : ${err.error.message}`); outLog('EMM', `Error loading GAPI client for API ${err}`); });
    }


    returnPayload = (token, size) => {
        let payLoad = {
            parent: process.env.REACT_APP_GAPI_ENTERPRICE_ID,
            pageSize: size,
            pageToken: token
        }
        return refineObject(payLoad);
    }


    getDevices = (token, size) => {
        inLog('EMM', "Get Devices request");
        // return window.gapi.client.load("androidmanagement", "v1").then(() => {
        // let queryObj = {};
        const payLoad = this.returnPayload(token, size);
        console.log("Payload for policy :", payLoad);
        return this.GAPI.client.androidmanagement.enterprises.devices
            .list(payLoad)
            .then(
                function (response) {
                    return response.result;
                },
                function (err) {
                    alert(`Devices API => Google Server Response : ${err.error.message}`);
                    outLog("Execute error", err);
                }
            );
        // });
    };

    getPolicies = (token, size) => {
        inLog('EMM', 'Get Policies request');

        const payLoad = this.returnPayload(token, size);
        console.log("Payload for policy :", payLoad);
        return this.GAPI.client.androidmanagement.enterprises.policies
            .list(payLoad)
            .then(
                function (response) {
                    return response.result;
                },
                function (err) {
                    outLog('EMM Policies Request Error', err);
                }
            )
    }

    getPolicy = (policyName) => {
        return this.GAPI.client.androidmanagement.enterprises.policies.get({
            "name": policyName
        })
            .then(function (response) {
                return response;
            },
                function (err) {
                    outLog('EMM', `EnrollmentToken Error ${err}`);
                })
    }

    deletePolicy = (name) => {
        return this.GAPI.client.androidmanagement.enterprises.policies
            .delete({
                "name": name
            })
            .then(function (response) {
                console.log('Response ', response);
            },
                function (error) {
                    console.log('Error ', error);
                });
    }

    deleteDevice = (name) => {
        return this.GAPI.client.androidmanagement.enterprises.devices
            .delete({
                "name": name
            })
            .then(function (response) {
                console.log('Response ', response);
            },
                function (error) {
                    console.log('Error ', error);
                })
    }

    createEnrollmentToken = () => {
        return this.GAPI.client.androidmanagement.enterprises.enrollmentTokens.create({
            "parent": "enterprises/LC02my9vtl",
            "resource": {
                "policyName": "enterprises/LC02my9vtl/policies/policyTest"
            }
        })
            .then(function (response) {
                return response.result
            },
                function (err) {
                    outLog('EMM', `EnrollmentToken Error ${err}`);
                })
    }


    createWebToken = () => {
        inLog('EMM', 'WebToken Request')
        return this.GAPI.client.androidmanagement.enterprises.webTokens.create({
            "parent": process.env.REACT_APP_GAPI_ENTERPRICE_ID,
            "resource": {
                "parentFrameUrl": "https://localhost:3000/home"
            }
        })
            .then(function (response) {
                // outLog('EMM',`WebToken Response Success ${response.result.value}`);
                return response.result.value;
            },
                function (err) {
                    outLog('EMM', `WebToken Error ${err}`);
                });
    }

}

export default GapiRequest;

