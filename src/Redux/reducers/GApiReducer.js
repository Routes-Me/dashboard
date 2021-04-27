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