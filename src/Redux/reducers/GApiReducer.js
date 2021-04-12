import { GApiConstants } from '../../constants/GApiConstants';

const INITIAL_STATE ={
    Devices : [],
    Application : [],
    Policies : [],
    loading : false,
    WebToken : '',
    GApiClient : '',
    Actionstate : ''
}

const GApiReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GApiConstants.authorization_REQUEST:
            return{
                ...state,
                loading : true
            };
        case GApiConstants.authorization_SUCCESS:
            return{
                ...state,
                loading : false,
                GApiClient : action.payload
            };
        case GApiConstants.authorization_ERROR:
            return {
                ...state,
                loading : false
            }
        case GApiConstants.createWebToken_REQUEST:
            return{
                ...state,
                loading : true
            }
        case GApiConstants.createWebToken_SUCCESS:
            return{
                ...state,
                loading : false,
                WebToken : action.payload
            }
        case GApiConstants.createWebToken_ERROR:
            return{
                ...state,
                loading : false
            }
        case GApiConstants.getPolicies_REQUEST:
            return{
                ...state,
                loading : true
            };
        case GApiConstants.getPolicies_SUCCESS:
            return {
                ...state,
                loading : false,
                Policies : action.payload
            };
        case GApiConstants.getDevices_REQUEST:
            return{
                ...state,
                loading : true,
            }
        case GApiConstants.getDevices_SUCCESS:
            return{
                ...state,
                loading : false,
                Devices : action.payload
            }
        case GApiConstants.getDevices_ERROR:
            return{
                ...state,
                loading : false,
            }
        case GApiConstants.updatePolicyList:
            return{
                ...state,
                Actionstate: action.type
            }
        case GApiConstants.emmComponentUpdated:
            return{
                ...state,
                Actionstate: action.type
            }
        default:
            return state
    }
}

export default GApiReducer;