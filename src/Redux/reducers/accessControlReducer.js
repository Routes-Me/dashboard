import { accessControlConstant } from '../../constants/accessControlConstant';

const INITIAL_STATE ={
    Applications : [],
    Privileges  : [],
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
        case accessControlConstant.getApplications_SUCCESS:
            return {
                ...state,
                Loading : false,
                Applications :action.payload
            };
        case accessControlConstant.getApplications_ERROR:
            return {
                ...state,
                Loading : false,
                Error   : action.payload
            };
        case accessControlConstant.getPrivilidges_REQUEST:
            return {
                ...state,
                Loading : true,
            };
        case accessControlConstant.getPrivilidges_SUCCESS:
            return {
                ...state,
                Loading  : false,
                Privileges : action.payload
            };
        case accessControlConstant.getApplications_ERROR:
            return {
                ...state,
                Loading : false,
                Error   : action.payload
            };
        case accessControlConstant.saveApplications_REQUEST:
            return {
                ...state,
                Loading : true
            };
        case accessControlConstant.saveApplications_SUCCESS:
            return {
                ...state,
                Loading : false
            };
        case accessControlConstant.saveApplications_ERROR:
            return {
                ...state,
                Loading : false,
                Error   : action.payload
            };
        case accessControlConstant.savePrivilidges_REQUEST:
            return {
                ...state,
                Loading : true,
            };
        case accessControlConstant.savePrivilidges_SUCCESS:
            return {
                ...state,
                Loading  : false,
                Priviledges : action.payload
            };
        case accessControlConstant.savePrivilidges_ERROR:
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