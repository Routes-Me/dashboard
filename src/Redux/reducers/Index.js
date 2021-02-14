import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import TrackingReducer from './TrackingReducer';
import VehicleReducer from './VehicleReducer';
import InstitutionReducer from './InstitutionReducer';
import UserReducer from './UserReducer';
import AdvertisementReducer from './AdvertisementReducer';
import PrizeReducer from './PrizeReducer';
import GApiReducer from './GApiReducer';

export default combineReducers({
    Login: LoginReducer,
    Tracking: TrackingReducer,
    VehicleStore: VehicleReducer,
    InstitutionStore: InstitutionReducer,
    UserStore: UserReducer,
    AdvertisementStore: AdvertisementReducer,
    PrizeStore : PrizeReducer,
    GApiStore : GApiReducer
});
