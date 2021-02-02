import { GApiConstants } from '../../constants/GApiConstants';

const INITIAL_STATE ={
    Devices : [],
    Application : [],
    Policies : [],
    loading : false,

}

const GApiReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
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