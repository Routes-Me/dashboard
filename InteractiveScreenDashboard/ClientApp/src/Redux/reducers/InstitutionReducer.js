import { institutionConstants } from '../../constants/institutionConstants';

const INITIAL_STATE = {
    Institutions: [],
    Loading: true,
    hasError: false,
    error: null
}

const InstitutionReducer = (state = {}, action) => {
    switch (action.type) {
        case institutionConstants.getInstitutions_REQUEST:
            return {
                        ...state,
                        Loading: true,
                        hasError: false
            };
        case institutionConstants.getInstitutions_SUCCESS:
            return {
                ...state,
                Loading: true,
                hasError: false,
                Institutions: action.payload
            };
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
            return INITIAL_STATE;
    }
}

export default InstitutionReducer;