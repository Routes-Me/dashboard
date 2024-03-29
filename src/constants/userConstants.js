﻿export const userConstants = {

    Login_REQUEST : 'LOGIN_REQUEST',
    Login_SUCCESS : 'LOGIN_SUCCESS',
    Login_FAILURE: 'LOGIN_FAILURE', 
    Login_TokenReceived : 'TOKEN_RECEIVED',
    Login_Authorize : 'LOGIN_AUTHORIZE',


    LogOut_REQUEST: 'LOGOUT_REQUEST',
    LogOut_SUCCESS: 'LOGOUT_SUCCESS',

    ForgotPassword_REQUEST: 'FORGOTPASSWORD_REQUEST',
    ForgotPassword_SUCCESS: 'FORGOTPASSWORD_SUCCESS',
    ForgotPassword_FAILURE: 'FORGOTPASSWORD_FAILURE',
    ChangePassword_REQUEST: 'CHANGEPASSWORD_REQUEST',
    ChangePassword_SUCCESS: 'CHANGEPASSWORD_SUCCESS',
    ChangePassword_FAILURE: 'CHANGEPASSWORD_FAILURE',

    NavItemSelected: 'NAVITEM_SELECTED',
    NavItem_Tracking: 'Tracking',
    NavItem_Vehicles: 'Vehicles',
    NavItem_Drivers: 'Drivers',
    NavItem_Institutions: 'Institutions',
    NavItem_Users: 'Users',
    NavItem_Advertisements:'Advertisements',
    NavItem_AccessControl : 'Access Control',
    NavItem_Campaigns : 'Campaigns',
    NavItem_Analytics : 'Analytics',
    NavItem_Prizes    : 'Prizes',
    NavItem_EMM    : 'EMM',
    NavItem_Bus    : 'Bus Routes',

    getUsers_REQUEST: "GETUSERS_REQUEST",
    getUsers_SUCCESS: "GETUSERS_SUCCESS",

    
    getPrivileges_REQUEST: "GETPRIVILEGES_REQUEST",
    update_PRIVILEGES: "UPDATE_PRIVILEGES",
    getPrivileges_ERROR: "GETPRIVILEGES_ERROR",

    getInvitationInfo_REQUEST: "GETINVITATIONINFO_REQUEST",
    updateInvitationForm: "UPDATE_INVITATION_INFO",
    getInvitationInfo_ERROR: "GETINVITATIONINFO_ERROR",

    getNavItems_REQUEST: "GETNAVITEMS_REQUEST",
    getNavItems_SUCCESS: "GETNAVITEMS_SUCCESS",

    getApplications_REQUEST: "GETUSERROLES_REQUEST",
    update_APPLICATIONS: "UPDATE_APPLICATIONS",
    getApplications_ERROR: "GETUSERROLES_ERROR",

    sendInvitation_REQUEST: "SAVEUSERS_REQUEST",
    sendInvitation_SUCCESS: "SAVEUSERS_SUCCES",

    deleteUser_Request : "DELETEUSER_REQUEST",
    deleteUser_Success : "DELETEUSER_SUCCESS",
    deleteUser_Error   : "DELETEUSER_ERROR",

    saveApplications_REQUEST    : 'SAVEAPPLICATIONS_REQUEST', 
    saveApplications_SUCCESS    : 'SAVEAPPLICATIONS_SUCCESS',
    saveApplications_ERROR      : 'SAVEAPPLICATIONS_ERROR',

    savePrivilidges_REQUEST    : 'SAVEPRIVILIDGES_REQUEST', 
    savePrivilidges_SUCCESS    : 'SAVEPRIVILIDGES_SUCCESS',
    savePrivilidges_ERROR      : 'SAVEPRIVILIDGES_ERROR',

    registerUser_REQUEST    : 'REGISTERUSER_REQUEST',
    registerUser_SUCCESS    : 'REGISTERUSER_SUCCESS',
    registerUser_ERROR      : 'REGISTERUSER_ERROR',


    UpdatePage: "UPDATE_PAGE",


    Domain: "http://api.routesme.com/api/"
    // Domain:'http://vmtprojectstage.uaenorth.cloudapp.azure.com:5000/api/' 
};
