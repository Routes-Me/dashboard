import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import TrackingReducer from './TrackingReducer';

export default combineReducers({
    Login: LoginReducer,
    Tracking: TrackingReducer
});
