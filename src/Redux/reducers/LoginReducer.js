import { userConstants } from '../../constants/userConstants';

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    error: null,
    SelectedNavOption:userConstants.NavItem_Tracking,
    user: {},
    navItems : [],
    token:""
};




const LoginReducer = (state = INITIAL_STATE, action) => { 
    
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
                user: action.payload
            };
        case userConstants.Login_FAILURE:
            return {
                    ...state,
                    loading: false,
                    hasError: true,
                    loggedIn: false,
                    user: ""
                };
        case userConstants.Login_TokenReceived:
                return {
                    ...state,
                    loading: false,
                    hasError: false,
                    loggedIn: true,
                    token: action.payload
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
                error: action.payload
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
        case userConstants.getNavItems_REQUEST:
            return {
                ...state,
                Laoding: true,
                hasError: false
            };
        case userConstants.getNavItems_SUCCESS:
                return {
                    ...state,
                    Loading: false,
                    hasError: false,
                    navItems: action.payload
                };
        default:
            return state;
    }
};

export default LoginReducer;

