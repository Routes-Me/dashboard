import { trackingConstants } from '../../constants/trackingConstants';
import * as signalR from '@aspnet/signalr';
import { isSU, returnEntityForInstitution } from '../../util/basic';
import apiHandler from '../../util/request';
import { config } from "../../constants/config";

let hubConnection = "";
let reconnectingInterval = "";

var token = "";
var user = "";
var role = "";

export function InitializeHub(token){
    token = token;
    return dispatch => {
    
        hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_HubURL, 
        {
            accessTokenFactory:() => getAccessToken(token)
        })
        .configureLogging(signalR.LogLevel.Trace)
        .build();
        hubConnection.serverTimeoutInMilliseconds = (60000 * 6);

    }

}

function getAccessToken(token){ return token }

export const Subscribing = payload => ({ type: trackingConstants.Tracking_OnSubscribeRequest });

export const Connected = payload => ({type: trackingConstants.Tracking_Connected});    



export function SubscribeToHub(role,user) {

    return dispatch => {

        user = user;
        role = role;
        dispatch(Subscribing());
        if(hubConnection.state === 0)
        {
            hubConnection.start()
                .then(() => {
                    console.log('!!Hub Connected!!');
                    const institutionForPriviledge = isSU(role)?null:user.institution.InstitutionId;
                    hubConnection.invoke('Subscribe',institutionForPriviledge,null,null).catch(function(err) {
                    console.log('!!Unable to subscribe to institution => '+err)
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
            console.log("!!Response on SignalR ", res);

            let FormatedRes =[];
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


export function CheckConnectivity(){
    if(hubConnection.state === 0)
    {
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
        if(hubConnection.state === 0)
        {
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


export function getDevices(role,user) {

    return dispatch => {
        dispatch(OfflineDataRequest());
        let domain = returnEntityForInstitution('devices',role,user);
        apiHandler.get(`${domain}?offset=1&limit=10`)
        .then(
            devices => {
                console.log('!!Devices response ', devices);
                dispatch(OfflineUpdateReceived(devices.data));
        },
            error => {
                    alert("Offline vehicle "+ error.toString());
            });
    }

}

function OfflineUpdateReceived(result) { return { type: trackingConstants.Tracking_OfflineDataSynced, payload: result } };
export const OfflineDataRequest = () => ({ type: trackingConstants.Tracking_OfflineDataRequest });
export const OfflineDataError = payload => ({ type: trackingConstants.Tracking_OfflineDataError });

function returnFormatedVehicles(response){

    const VehicleList = response.data.data;
    const InstitutionList = response.data.included.institutions;
    const ModelList = response.data.included.models;

    const FormatedVehicle = VehicleList.map(x => ({
        id: x.vehicleId,
        institution: InstitutionList.filter(y => y.InstitutionId === x.institutionId)[0],
        plateNumber: x.plateNumber,
        model: ModelList.filter(y => y.ModelId === x.modelId)[0],
        status:"idle",
        //make: MakerList.filter(y => y.makeId === x.makeId)[0],
        //deviceId: x.deviceId,
        modelYear: x.modelYear
    }))

    let vehicles= {
        data : FormatedVehicle,
        page : response.data.pagination
      }

    return vehicles;
}


export function updateSelectedMarker(vehicleID) {
    return dispatch => {
        dispatch(UpdatedMarkerId(vehicleID));
    }
}

export function updateVehicle(vehicle){
    return dispatch => {
        dispatch(updateVehicleOnStore(vehicle))
    }
}

function updateVehicleOnStore(vehcile){
    return {type : trackingConstants.Tracking_SelectedVehicle, payload: vehcile}
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







