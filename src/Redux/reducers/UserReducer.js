﻿import { userConstants } from '../../constants/userConstants';
import { stat } from 'fs';

const INITIAL_STATE = {
    Users: [],
    UserRoles: [],
    Applications: [],
    navItems : [],
    Page: "",
    Loading: true,
    hasError: false,
    error: null
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.getUsers_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case userConstants.getUsers_SUCCESS:
            return {
                ...state,
                Loading: true,
                hasError: false,
                Users: action.payload
            };
        case userConstants.getUserRoles_REQUEST:
            return {
                ...state,
                Laoding: true,
                hasError: false
            };
        case userConstants.update_USERROLES:
            return {
                ...state,
                Loading: true,
                hasError: false,
                UserRoles: action.payload
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
        case userConstants.getApplications_REQUEST:
            return {
                ...state,
                Laoding: true,
                hasError: false
            };
        case userConstants.update_APPLICATIONS:
            return {
                ...state,
                Loading: true,
                hasError: false,
                Applications: action.payload
            };
        case userConstants.saveUsers_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case userConstants.saveUsers_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false
            };
        case userConstants.UpdatePage:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Page: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;