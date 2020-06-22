import { trackingConstants } from '../../constants/trackingConstants';
//import * as signalR from '@aspnet/signalr';

export const connectSignalRToHub = () => ({
    type: trackingConstants.Tracking_OnConnectionStart
});


export const onLocationChange = payload => ({
    type: trackingConstants.Tracking_OnChangeInLocation,
    payload
});