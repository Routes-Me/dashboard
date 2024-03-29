﻿import { userConstants } from '../../constants/userConstants';

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    error: null,
    SelectedNavOption: userConstants.NavItem_Tracking,
    user: {},
    role: {},
    navItems: [],
    token: "",
    ActionState: ""
};




const LoginReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case userConstants.Login_REQUEST:
            return {
                ...state,
                loading: true,
                loggedIn: false,
                navItems: [],
                ActionState: action.type
            };
        case userConstants.Login_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                loggedIn: true,
                user: action.payload,
                ActionState: action.type
            };
        case userConstants.Login_FAILURE:
            return {
                ...state,
                loading: false,
                hasError: true,
                loggedIn: false,
                user: "",
                ActionState: action.type
            };
        case userConstants.Login_TokenReceived:
            return {
                ...state,
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
                user: ''
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
        case userConstants.Login_Authorize:
            return {
                ...state,
                hasError: false,
                role: action.payload
            };
        default:
            return state;
    }
};

export default LoginReducer;

