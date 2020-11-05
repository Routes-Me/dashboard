import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import TrackingReducer from './TrackingReducer';
import VehicleReducer from './VehicleReducer';
import InstitutionReducer from './InstitutionReducer';
import UserReducer from './UserReducer';
import AdvertisementReducer from './AdvertisementReducer';
import accessControlReducer from './accessControlReducer';

export default combineReducers({
    Login: LoginReducer,
    Tracking: TrackingReducer,
    VehicleStore: VehicleReducer,
    InstitutionStore: InstitutionReducer,
    UserStore: UserReducer,
    AdvertisementStore: AdvertisementReducer,
    AccessControlStore : accessControlReducer
});
