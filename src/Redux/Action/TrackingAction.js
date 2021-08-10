import { trackingConstants } from '../../constants/trackingConstants';
import * as signalR from '@aspnet/signalr';
import { convertDateTimeToUnix, convertObjectKeyToLowerCase, isSU, returnEntityForInstitution, sortArrayOnKey } from '../../util/basic';
import apiHandler from '../../util/request';
import { config } from "../../constants/config";

let hubConnection = "";
let reconnectingInterval = "";

var token = "";
var user = "";
var role = "";

export function InitializeHub(token) {
    token = token;
    return dispatch => {

        hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_HubURL,
                {
                    accessTokenFactory: () => getAccessToken(token)
                })
            .configureLogging(signalR.LogLevel.Trace)
            .build();
        hubConnection.serverTimeoutInMilliseconds = (60000 * 6);

    }

}

function getAccessToken(token) { return token }

export const Subscribing = payload => ({ type: trackingConstants.Tracking_OnSubscribeRequest });

export const Connected = payload => ({ type: trackingConstants.Tracking_Connected });



export function SubscribeToHub(role, user) {

    return dispatch => {

        user = user;
        role = role;
        dispatch(Subscribing());
        if (hubConnection.state === 0) {
            hubConnection.start()
                .then(() => {
                    console.log('!!Hub Connected!!');
                    const institutionForPriviledge = isSU(role) ? null : user.institution.institutionid;
                    console.log('institutionForPriviledge ', institutionForPriviledge);
                    hubConnection.invoke('Subscribe', institutionForPriviledge, null, null).catch(function (err) {
                        console.log('!!Unable to subscribe to institution => ' + err)
                    })
                    dispatch(Connected());
                })
                .catch(err => console.error("!!Error while establishing connection : " + err));
        }


        reconnectingInterval = setInterval(() => {
            CheckConnectivity()
        }, 60000);

        hubConnection.on("FeedsReceiver", (result) => {

            // console.log("");
            //sampleData.push(result)

            const res = JSON.parse(result);
            // console.log("!!Response on SignalR ", res);

            let FormatedRes = [];
            // if (isSU(user))
            // {
            //     FormatedRes = { id: res.vehicleId, institutionId: res.institutionId, deviceId: res.deviceId, status: "active", coordinates: { lat: parseFloat(res.coordinates.latitude), lng: parseFloat(res.coordinates.longitude), timestamp: res.coordinates.timestamp } }
            // }
            // else{
            //     if (res.institutionId === user.InstitutionId){
            FormatedRes = { id: res.vehicleId, institutionId: res.institutionId, deviceId: res.deviceId, status: "active", coordinates: { lat: parseFloat(res.coordinates.latitude), lng: parseFloat(res.coordinates.longitude), timestamp: res.coordinates.timestamp } }
            //     }
            // }
            dispatch(OnUpdateReceived(FormatedRes));
        });

    };
}


export function CheckConnectivity() {
    if (hubConnection.state === 0) {
        console.log('!!Reconnecting Hub...');
        hubConnection.start()
            .then(() => {
                console.log('!!Hub Connected!!');
                // dispatch(Connected());
            })
            .catch(err => console.error("!!Error while establishing connection : " + err));
    }
}
export const Unsubscribe = payload => ({ type: trackingConstants.Tracking_OnUnSubscribeRequest });
export const Disconnected = payload => ({ type: trackingConstants.Tracking_Disconnected });



export function UnsubscribeFromHub() {

    clearInterval(reconnectingInterval); //removed interval check on unssubscribe
    return dispatch => {
        dispatch(Unsubscribe());
        console.log('Hub State ', hubConnection.state);
        if (hubConnection.state === 1) {
            hubConnection.stop()
                .then(() => {
                    console.log('!!Hub Disconnected!!');
                    dispatch(Disconnected());
                })
                .catch(err => {
                    console.error("!!Error while disconnecting : " + err);
                });
        }
    };

    //function Unsubscribe() { return { type: trackingConstants.Tracking_OnUnSubscribeRequest }; }
    //function Disconnected() { return { type: trackingConstants.Tracking_Disconnected }; }
}


export function getVehiclesLog(start, end, status) {
    return dispatch => {
        dispatch(vehicleLogRequest());
        start = convertDateTimeToUnix(start);
        end = convertDateTimeToUnix(end);
        dispatch(OfflineDataRequest());
        apiHandler.get(`${status}?startAt=${start}&endAt=${end}&offset=1&limit=10000`)
            .then(
                vehicles => {
                    dispatch(updateVehicleLog(returnVehicleLogGroupedByVehicleId(vehicles.data)));
                },
                error => {
                    console.log('error ', error);
                })
    }
}

const returnVehicleLogGroupedByVehicleId = (vehicles) => {
    let result = [];
    let groupedVehicle = [];
    if (vehicles.data.length > 0) {
        groupedVehicle = vehicles.data.reduce(function (res, value) {
            if (!res[value.vehicleId]) {
                res[value.vehicleId] = { vehicleId: value.vehicleId, total: 0, plateNumber: value.plateNumber, institutionName: value.institutionName, days: 0 };
                result.push(res[value.vehicleId])
            }
            res[value.vehicleId].total += value.total;
            res[value.vehicleId].days += 1;
            return result;
        }, {});
    }
    const formattedVehicles = {
        data: sortArrayOnKey(groupedVehicle, "plateNumber", config.sortOrder.descending),
        total: groupedVehicle.length,
        page: vehicles.pagination
    }
    console.log('Formatted vehicle log', formattedVehicles);
    return formattedVehicles;
}



function vehicleLogRequest() {
    return { type: trackingConstants.TrackingVehicleLog_Request }
}
function updateVehicleLog(vehicles) {
    return { type: trackingConstants.TrackingVehicleLog_Success, payload: vehicles }
}

export function getDevices(role, user) {

    return dispatch => {
        dispatch(OfflineDataRequest());
        let domain = returnEntityForInstitution('devices', role, user);
        apiHandler.get(`${domain}?offset=1&limit=10`)
            .then(
                devices => {
                    console.log('!!Devices response ', devices);
                    dispatch(OfflineUpdateReceived(devices.data));
                },
                error => {
                    alert("Offline vehicle " + error.toString());
                });
    }

}

function OfflineUpdateReceived(result) { return { type: trackingConstants.Tracking_OfflineDataSynced, payload: result } };
export const OfflineDataRequest = () => ({ type: trackingConstants.Tracking_OfflineDataRequest });
export const OfflineDataError = payload => ({ type: trackingConstants.Tracking_OfflineDataError });

function returnFormatedVehicles(response) {

    const VehicleList = response.data.data;
    const InstitutionList = response.data.included.institutions;
    const ModelList = response.data.included.models;

    const FormatedVehicle = VehicleList.map(x => ({
        id: x.vehicleId,
        institution: InstitutionList.filter(y => y.InstitutionId === x.institutionId)[0],
        plateNumber: x.plateNumber,
        model: ModelList.filter(y => y.ModelId === x.modelId)[0],
        status: "idle",
        //make: MakerList.filter(y => y.makeId === x.makeId)[0],
        //deviceId: x.deviceId,
        modelYear: x.modelYear
    }))

    let vehicles = {
        data: FormatedVehicle,
        page: response.data.pagination
    }

    return vehicles;
}


export function updateSelectedMarker(vehicleID) {
    return dispatch => {
        dispatch(UpdatedMarkerId(vehicleID));
    }
}

export function updateVehicle(vehicle) {
    return dispatch => {
        dispatch(updateVehicleOnStore(vehicle))
    }
}

function updateVehicleOnStore(vehcile) {
    return { type: trackingConstants.Tracking_SelectedVehicle, payload: vehcile }
}


function UpdatedMarkerId(vehicleID) {
    return { type: trackingConstants.Tracking_MarkerHighLighted, payload: vehicleID };
}

function OnUpdateReceived(result) {

    return {
        type: trackingConstants.Tracking_OnUpdatesReceived,
        payload: result
    };

};







