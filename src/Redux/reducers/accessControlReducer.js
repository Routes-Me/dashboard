import { accessControlConstant, accessControlConstants } from '../../constants/accessControlConstant';

const INITIAL_STATE ={
    Applications : [],
    Priviledges  : [],
    Loading      : false,
    Error        : '',
    ActionState  : ''
}


const accessControlReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case accessControlConstant.getApplications_REQUEST:
            return {
                ...state,
                Loading : true
            };
        case accessControlConstants.getApplications_SUCCESS:
            return {
                ...state,
                Loading : false,
                Applications :action.payload
            };
        case accessControlConstants.getApplications_ERROR:
            return {
                ...state,
                Loading : false,
                Error   : action.payload
            };
        case accessControlConstants.getPrivilidges_REQUEST:
            return {
                ...state,
                Loading : true,
            };
        case accessControlConstants.getPrivilidges_SUCCESS:
            return {
                ...state,
                Loading  : false,
                Priviledges : action.payload
            };
        case accessControlConstants.getApplications_ERROR:
            return {
                ...state,
                Loading : false,
                Error   : action.payload
            };
        case accessControlConstants.saveApplications_REQUEST:
            return {
                ...state,
                Loading : true
            };
        case accessControlConstants.saveApplications_SUCCESS:
            return {
                ...state,
                Loading : false,
                Applications :action.payload
            };
        case accessControlConstants.saveApplications_ERROR:
            return {
                ...state,
                Loading : false,
                Error   : action.payload
            };
        case accessControlConstants.savePrivilidges_REQUEST:
            return {
                ...state,
                Loading : true,
            };
        case accessControlConstants.savePrivilidges_SUCCESS:
            return {
                ...state,
                Loading  : false,
                Priviledges : action.payload
            };
        case accessControlConstants.savePrivilidges_ERROR:
            return {
                ...state,
                Loading : false,
                Error   : action.payload
            };
        default:
            return state;
    }

}

export default accessControlReducer;