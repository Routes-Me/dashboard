import { trackingConstants } from '../../constants/trackingConstants';
import * as signalR from '@aspnet/signalr';


const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:55202/trackServiceHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();



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
            console.log("Response on SignalR " , result);
            const res = JSON.parse(result);
            console.log("const values : " + res.vehicle_id);
            const vehicleId = res.vehicle_id;
            dispatch(OnUpdateReceived(res));
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


function OnUpdateReceived(result) {
    console.log("Result :" + result);
    return { type: trackingConstants.Tracking_OnUpdatesReceived, payload: result };
};


