import { trackingConstants } from '../../constants/trackingConstants';
import * as signalR from '@aspnet/signalr';


const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:55202/trackServiceHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();


const sampleOfflineData = [
    { vehicle_id: 8, institution_id: 1, status:"idle", coordinates: { latitude: 29.3, longitude: 47.2511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 9, institution_id: 1, status:"idle", coordinates: { latitude: 29.7, longitude: 47.3511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 10, institution_id: 1, status:"idle", coordinates: { latitude: 29.7, longitude: 46.8511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 11, institution_id: 1, status: "idle", coordinates: { latitude: 29.6, longitude: 46.9511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 12, institution_id: 1, status: "idle", coordinates: { latitude: 29.612, longitude: 46.5611, timestamp: "7/1/2020 5:55:51 AM" } }];

const sampleData = [
    { vehicle_id: 1, institution_id: 1, status: "Running", coordinates: { latitude: 29.6, longitude: 47.5511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 2, institution_id: 1, status: "Running", coordinates: { latitude: 29.7, longitude: 47.1511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 3, institution_id: 1, status: "Running", coordinates: { latitude: 29.8, longitude: 47.2511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 4, institution_id: 1, status: "Running", coordinates: { latitude: 29.85, longitude: 47.3511, timestamp: "7/1/2020 5:55:51 AM" } },
    { vehicle_id: 5, institution_id: 1, status: "Running", coordinates: { latitude: 29.75, longitude: 47.4511, timestamp: "7/1/2020 5:55:51 AM" } }];

export const Subscribing = payload => ({ type: trackingConstants.Tracking_OnSubscribeRequest });

export const Connected = payload => ({type: trackingConstants.Tracking_Connected});

export function SubscribeToHub() {

    return dispatch => {

        dispatch(Subscribing());
        hubConnection.start()
            .then(() => {
                console.log('Hub Connected!!');
                dispatch(Connected());
            })
            .catch(err => console.error("Error while establishing connection : " + err));


        hubConnection.on("ReceiveAll", (result) => {
            //console.log("Response on SignalR ", sampleData);
            //sampleData.push(result)
            const res = JSON.parse(result);
            console.log("const values : " + res.vehicle_id);
            const vehicleId = res.vehicle_id;
            dispatch(OnUpdateReceived([res, ...sampleData]));
        });

    };
}

export const Unsubscribe = payload => ({ type: trackingConstants.Tracking_OnUnSubscribeRequest });
export const Disconnected = payload => ({ type: trackingConstants.Tracking_Disconnected });

export function UnsubscribeFromHub() {

    return dispatch => {
        dispatch(Unsubscribe());
        hubConnection.stop()
            .then(() => {
                console.log('Hub Disconnected!!');
                dispatch(Disconnected());
            })
            .catch(err => {
                console.error("Error while disconnecting : " + err);
            });
    };

    //function Unsubscribe() { return { type: trackingConstants.Tracking_OnUnSubscribeRequest }; }
    //function Disconnected() { return { type: trackingConstants.Tracking_Disconnected }; }
}

export const OfflineDataRequest = payload => ({ type: trackingConstants.Tracking_OfflineDataRequest });
export const OfflineDataError = payload => ({ type: trackingConstants.Tracking_OfflineDataError });

export function getOfflineData() {

    return dispatch => {
        dispatch(OfflineDataRequest());
        dispatch(OfflineUpdateReceived(sampleOfflineData));
    };

}

export function updateSelectedMarker(vehicleID) {
    return dispatch => {
        dispatch(UpdatedMarkerId(vehicleID));
    }
}


function UpdatedMarkerId(vehicleID) {
    return { type: trackingConstants.Tracking_MarkerHighLighted, payload: vehicleID };
}

function OnUpdateReceived(result) {

    console.log("Result :" + result);
    return { type: trackingConstants.Tracking_OnUpdatesReceived, payload: result };

};

function OfflineUpdateReceived(result) {

    console.log("Offline Data :" + result);
    return { type: trackingConstants.Tracking_OfflineDataSynced, payload: result };

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





