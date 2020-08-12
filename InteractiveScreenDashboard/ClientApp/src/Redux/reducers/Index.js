import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import TrackingReducer from './TrackingReducer';
import VehicleReducer from './VehicleReducer';
import InstitutionReducer from './InstitutionReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    Login: LoginReducer,
    Tracking: TrackingReducer,
    VehicleStore: VehicleReducer,
    InstitutionStore: InstitutionReducer,
    UserStore: UserReducer
});
