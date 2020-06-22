import { trackingConstants } from '../../constants/trackingConstants';

const INITIAL_STATE = {
    ConnectionEstablished: false,
    Loading: true,
    hasError: false,
    error: null,
    Coordinates: {}
};

const TrackingReducer = ( state = {}, action ) => {
    switch (action.type) {
        case trackingConstants.Tracking_OnConnectiRequest:
            return {
                ...state,
                ConnectionEstablished: false,
                Loading: true,
                hasError: false
            };
        case trackingConstants.Tracking_Connecting:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case trackingConstants.Tracking_Connected:
            return {
                ...state,
                Loading: false,
                hasError: false
            };
        case trackingConstants.Tracking_OnChangeInLocation:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Coordinates: action.payload
            };
        case trackingConstants.Tracking_OnConnectionClose:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case trackingConstants.Tracking_Disconnected:

        default:
            return INITIAL_STATE;
    }
};

export default TrackingReducer;