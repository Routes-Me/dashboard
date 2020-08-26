import { userConstants } from '../../constants/userConstants';

//const user = JSON.parse(localStorage.getItem('user'));

const INITIAL_STATE = {
    loading: true,
    hasError: false,
    error: null,
    SelectedNavOption:"",
    user: {}
};




const LoginReducer = (state = {}, action) => { 
    //console.log("/Login Reducer => state  : ", state);
    //console.log("/Login Reducer => action : ", action);
    switch (action.type) {
        case userConstants.Login_REQUEST:
            return {
                ...state,
                loading: true,
                loggedIn: false
            };
        case userConstants.Login_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                loggedIn: true,
                user: action.payload.data
            };
        case userConstants.Login_LOGOUT:
            return {
                ...state,
                loading: false,
                hasError: true,
                loggedIn: false,
                user: action.payload
            };
        case userConstants.Login_FAILURE:
            return {
                ...state,
                loading: false,
                hasError: false,
                loggedIn: false,
                user: action.payload
            };
        case userConstants.ForgotPassword_REQUEST:
            return {
                ...state,
                loading: true,
                loggedIn: false
            };
        case userConstants.ForgotPassword_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                loggedIn: true,
                user: action.payload
            };
        case userConstants.ForgotPassword_FAILURE:
            return {
                ...state,
                loading: false,
                hasError: false,
                loggedIn: false,
                user: action.payload
            };
        case userConstants.NavItemSelected:
            return {
                ...state,
                loading: false,
                hasError: false,
                loggedIn: true,
                SelectedNavOption: action.payload
            };
        default:
            return state;
    }
};

export default LoginReducer;

