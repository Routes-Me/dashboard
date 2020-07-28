import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import TrackingReducer from './TrackingReducer';
import VehicleReducer from './VehicleReducer';

export default combineReducers({
    Login: LoginReducer,
    Tracking: TrackingReducer,
    VehicleStore: VehicleReducer
});
