import { institutionConstants } from '../../constants/institutionConstants';

const INITIAL_STATE = {
    Institutions: [],
    Services:[],
    Loading: true,
    hasError: false,
    error: null
}

const InstitutionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case institutionConstants.getInstitutions_REQUEST:
            return {
                        ...state,
                        Loading: true,
                        hasError: false,
            };
        case institutionConstants.getInstitutions_SUCCESS:
            return {
                ...state,
                Loading: true,
                hasError: false,
                Institutions: action.payload
            };
        case institutionConstants.serviceList_UPDATED:
            return {
                Services: action.payload
            }
        case institutionConstants.saveInstitutions_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case institutionConstants.saveInstitutions_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false
            };
        default:
            return state;
    }
}

export default InstitutionReducer;