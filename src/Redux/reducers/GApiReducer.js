import { GApiConstants } from '../../constants/GApiConstants';

const INITIAL_STATE ={
    Devices : [],
    Application : [],
    Policies : [],
    loading : false,
    WebToken : '',
    GApiClient : ''
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
        default:
            return state
    }
}

export default GApiReducer;