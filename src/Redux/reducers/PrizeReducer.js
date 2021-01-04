import { prizeConstants } from '../../constants/prizeConstants';

const INITIAL_STATE ={
    Candidates : [],
    Draws      : [],
    Winners    : [],
    Loading    : false
}


const PrizeReducer = (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case prizeConstants.Candidate_REQUEST:
            return {
                ...state,
                Loading : true
            };
        case prizeConstants.Candidate_SUCCESS:
            return {
                ...state,
                Loading : false,
                Candidates : action.payload
            };
        case prizeConstants.Candidate_FAILURE:
            return {
                ...state,
                Loading : false
            };
        case prizeConstants.Draws_REQUEST:
            return {
                ...state,
                Loading : true
            };
        case prizeConstants.Draws_SUCCESS:
            return {
                ...state,
                Loading : false,
                Draws : action.payload
            };
        case prizeConstants.Draws_FAILURE:
            return {
                ...state,
                Loading : false
            };
        case prizeConstants.Winners_REQUEST:
            return {
                ...state,
                Loading : true
            };
        case prizeConstants.Winners_SUCCESS:
            return {
                ...state,
                Loading : false,
                Winners : action.payload
            };
        case prizeConstants.Winners_FAILURE:
            return {
                ...state,
                Loading : false
            };
    
        default:
            return state;
    }
}

export default PrizeReducer;