import { combinedReducers } from 'redux';
import { LoginReducer } from './LoginReducer';

const rootReducer = combinedReducers({
    Login: LoginReducer
});

export default rootReducer;