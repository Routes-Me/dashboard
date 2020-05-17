import { LoginReducer } from './LoginReducer';
import { combinedReducers } from 'redux';


const rootReducer = combinedReducers({
    LoginReducer: LoginReducer
});

export default rootReducer;