import { trackingConstants } from '../../constants/trackingConstants';
import * as signalR from '@aspnet/signalr';
import axios from 'axios';
import { userConstants } from '../../constants/userConstants';
import { HubConnectionState } from '@microsoft/signalr';



const sampleOfflineData = [
    { vehicle_id: 8, institution_id: 1, status: trackingConstants.IdleState, driver: "Mohammad Ali", contact: "+965-55988028", model: "BMW X6 . 2018", company: "Afnan", coordinates: { latitude: 29.376383900000000, longitude: 47.9866178, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 9, institution_id: 1, status: trackingConstants.IdleState, driver: "Saad Mua", contact: "+965-55988028", model: "JEEP X4 . 2019", company: "Afnan", coordinates: { latitude: 29.73, longitude: 47.3511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 10, institution_id: 1, status: trackingConstants.IdleState, driver: "Waseem Noor", contact: "+965-66104209", model: "KIA Y6 . 2020", company: "Afnan",coordinates: { latitude: 29.74, longitude: 46.8511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 11, institution_id: 1, status: trackingConstants.IdleState, driver: "Yahya Alahaar", contact: "+965-55988128", model: "AUDI A6 . 2020", company: "Afnan", coordinates: { latitude: 29.62, longitude: 46.9511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 12, institution_id: 1, status: trackingConstants.IdleState, driver: "Mohammad Waali", contact: "+965-55988328", model: "BMW X3 . 2017", company: "Afnan", coordinates: { latitude: 29.63, longitude: 46.5611, timestamp: "7/1/2020 5:55:51 AM" } }
];

const sampleData = [
    { vehicle_id: 1, institution_id: 1, status: trackingConstants.ActiveState, driver: "Mohammad Ali", contact: "+965-55988028", model: "BMW X6 . 2017", company: "Afnan", coordinates: { latitude: 29.61, longitude: 47.5511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 2, institution_id: 1, status: trackingConstants.ActiveState, driver: "Mohammad Waali", contact: "+965-55988328", model: "BMW X3 .2016", company: "Afnan", coordinates: { latitude: 29.71, longitude: 47.1511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 3, institution_id: 1, status: trackingConstants.ActiveState, driver: "Waseem Noor", contact: "+965-66104209", model: "KIA Y6 . 2018", company: "Afnan", coordinates: { latitude: 29.81, longitude: 47.2511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 4, institution_id: 1, status: trackingConstants.ActiveState, driver: "Saad Mua", contact: "+965-55988028", model: "JEEP X4 . 2019", company: "Afnan", coordinates: { latitude: 29.82, longitude: 47.3511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 5, institution_id: 1, status: trackingConstants.ActiveState, driver: "Yahya Alahaar", contact: "+965-55988128", model: "AUDI A6 . 2020", company: "Afnan", coordinates: { latitude: 29.72, longitude: 47.4511, timestamp: "7/1/2020 5:55:51 AM" } }];



const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://vmtprojectstage.uaenorth.cloudapp.azure.com:5002/trackServiceHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();




export const Subscribing = payload => ({ type: trackingConstants.Tracking_OnSubscribeRequest });

export const Connected = payload => ({type: trackingConstants.Tracking_Connected});                                                                                                                                                      

export function SubscribeToHub() {

    return dispatch => {

        dispatch(Subscribing());
        if(hubConnection.state === 0)
        {
            hubConnection.start()
                .then(() => {
                    console.log('Hub Connected!!');
                    dispatch(Connected());
                })
                .catch(err => console.error("Error while establishing connection : " + err));
        }

            setInterval(() => {
                CheckConnectivity()
            }, 6000);

        hubConnection.on("ReceiveAllData", (result) => {
            
            //sampleData.push(result)
            const res = JSON.parse(result);
            console.log("Response on SignalR ", res);
            const FormatedRes = { id: res.vehicleId, institutionId: res.institutionId, deviceId: res.deviceId, status: "active", driver: "Abdullah", contact: "+965-55988028", model: "BMW X6 . 2017", company: "Routes", coordinates: { latitude: parseFloat(res.coordinates.latitude), longitude: parseFloat(res.coordinates.longitude), timestamp: res.coordinates.timestamp } }
            //console.log("const values : " + res.vehicle_id);
            // const vehicleId = res.vehicle_id;
            //dispatch(OnUpdateReceived([FormatedRes, ...sampleData]));
            dispatch(OnUpdateReceived(FormatedRes));
        });

    };
}


export function CheckConnectivity(){
    if(hubConnection.state === 0)
    {
        console.log('Recoonecting the hub')
            hubConnection.start()
            .then(() => {
                console.log('Hub Connected!!');
                // dispatch(Connected());
            })
            .catch(err => console.error("Error while establishing connection : " + err));
    }
}

export const Unsubscribe = payload => ({ type: trackingConstants.Tracking_OnUnSubscribeRequest });
export const Disconnected = payload => ({ type: trackingConstants.Tracking_Disconnected });

export function UnsubscribeFromHub() {

    return dispatch => {
        dispatch(Unsubscribe());
        if(hubConnection.state === 0)
        {
            hubConnection.stop()
            .then(() => {
                console.log('Hub Disconnected!!');
                dispatch(Disconnected());
            })
            .catch(err => {
                console.error("Error while disconnecting : " + err);
            });
        }
    };

    //function Unsubscribe() { return { type: trackingConstants.Tracking_OnUnSubscribeRequest }; }
    //function Disconnected() { return { type: trackingConstants.Tracking_Disconnected }; }
}


export function getOfflineData() {

    return dispatch => {
        dispatch(OfflineDataRequest());
        axios.get(userConstants.Domain + '/tracking').then(
            idleVehicles => {
                //dispatch(OfflineUpdateReceived(idleVehicles.data));
                
            },
            error => {
                //alert(error.toString());
            });
        //dispatch(OfflineUpdateReceived(sampleOfflineData));
    };

}
function OfflineUpdateReceived(result) { return { type: trackingConstants.Tracking_OfflineDataSynced, payload: result } };
export const OfflineDataRequest = () => ({ type: trackingConstants.Tracking_OfflineDataRequest });
export const OfflineDataError = payload => ({ type: trackingConstants.Tracking_OfflineDataError });


export function updateSelectedMarker(vehicleID) {
    return dispatch => {
        dispatch(UpdatedMarkerId(vehicleID));
    }
}


function UpdatedMarkerId(vehicleID) {
    return { type: trackingConstants.Tracking_MarkerHighLighted, payload: vehicleID };
}

function OnUpdateReceived(result) {

    //console.log("Result :" + result);
    return {
        type: trackingConstants.Tracking_OnUpdatesReceived,
        payload: result
    };

};


//async function start() {
//    try {
//        await hubConnection.start();
//        console.assert(hubConnection.state === signalR.HubConnectionState.Connected);
//        console.log("connected");
//    } catch (err) {
//        console.assert(hubConnection.state === signalR.HubConnectionState.Disconnected);
//        console.log(err);
//        setTimeout(() => start(), 5000);
//    }
//};

//SignalR CallBack Methods

//hubConnection.onreconnecting(error => {
//    console.assert(hubConnection.state === signalR.HubConnectionState.Reconnecting);
//    console.log("Reconnecting Back to the Hub :" + error)
//});

//hubConnection.on("ReceiveAll", (result) => {
//    console.log("Response on SignalR " + result);
//    const res = JSON.parse(result);
//    console.log("const values : " + res.vehicle_id);
//    const vehicleId = res.vehicle_id;
//    return dispatch => { dispatch(OnUpdateReceived(result)); };

//});

//export const OnUpdateReceived = payload => ({ type: trackingConstants.Tracking_OnUpdatesReceived, payload });





