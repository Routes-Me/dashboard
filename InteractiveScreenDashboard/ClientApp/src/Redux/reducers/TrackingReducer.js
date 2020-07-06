import { trackingConstants } from '../../constants/trackingConstants';

const INITIAL_STATE = {
    ConnectionEstablished: false,
    Loading: true,
    hasError: false,
    error: null,
    Updates: [],
    OflineUpdates:[]
};

const TrackingReducer = ( state = {}, action ) => {
    switch (action.type) {
        case trackingConstants.Tracking_OnSubscribeRequest:
            return {
                ...state,
                ConnectionEstablished: false,
                Loading: true,
                hasError: false
            };
        case trackingConstants.Tracking_Connected:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ConnectionEstablished: true
            };
        case trackingConstants.Tracking_OnUpdatesReceived:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ConnectionEstablished: true,
                Updates: [action.payload]
            };
        case trackingConstants.Tracking_Disconnected:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ConnectionEstablished: false
            };
        case trackingConstants.Tracking_OnUnSubscribeRequest:
            return {
                ...state,
                Loading: true,
                hasError: false,
                ConnectionEstablished: true
            };
        case trackingConstants.Tracking_OfflineDataRequest:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case trackingConstants.Tracking_OfflineDataSynced:
            return {
                ...state,
                Loading: false,
                hasError: true,
                OflineUpdates: action.payload
            };
        case trackingConstants.Tracking_OfflineDataError:
            return {
                ...state,
                Loading: false,
                hasError: true
            };

        default:
            return INITIAL_STATE;
    }
};

export default TrackingReducer;