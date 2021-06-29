import { userConstants } from '../../constants/userConstants';

const INITIAL_STATE = {
    Users: [],
    Privileges: [],
    Applications: [],
    Page: "",
    Loading: true,
    hasError: false,
    error: null,
    ActionState: '',
    Invitee: {}

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
        case userConstants.update_PRIVILEGES:
            return {
                ...state,
                Loading: true,
                hasError: false,
                Privileges: action.payload,
                ActionState: userConstants.update_PRIVILEGES
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
                Applications: action.payload,
                ActionState: userConstants.update_APPLICATIONS
            };
        case userConstants.sendInvitation_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case userConstants.sendInvitation_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ActionState: userConstants.sendInvitation_SUCCESS
            };
        case userConstants.deleteUser_Request:
            return {
                ...state,
                Loading: true,
                hasError: false,
                ActionState: action.type
            };
        case userConstants.deleteUser_Success:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ActionState: userConstants.saveUsers_SUCCESS
            };
        case userConstants.saveApplications_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case userConstants.saveApplications_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ActionState: userConstants.saveApplications_SUCCESS
            };
        case userConstants.savePrivilidges_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case userConstants.savePrivilidges_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ActionState: userConstants.savePrivilidges_SUCCESS
            };
        case userConstants.registerUser_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false,
                ActionState: userConstants.registerUser_REQUEST
            };
        case userConstants.registerUser_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ActionState: userConstants.registerUser_SUCCESS
            };
        case userConstants.registerUser_ERROR:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ActionState: userConstants.registerUser_ERROR
            };
        case userConstants.UpdatePage:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Page: action.payload
            }
        case userConstants.getInvitationInfo_REQUEST:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ActionState: userConstants.getInvitationInfo_REQUEST
            };
        case userConstants.updateInvitationForm:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Page: action.updateInvitationForm,
                Invitee: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;