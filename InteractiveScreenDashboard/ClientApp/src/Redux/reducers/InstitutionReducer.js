import { institutionConstants } from '../../constants/institutionConstants';

const INITIAL_STATE = {
    Institutions: [],
    Services: [],
    Page: "",
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
                Loading: false,
                hasError: false,
                Institutions: action.payload
            };
        case institutionConstants.serviceList_UPDATED:
            return {
                Services: action.payload
            };
        case institutionConstants.getServices_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case institutionConstants.getServices_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Services: action.payload
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
        case institutionConstants.updatePage:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Page: action.payload
            }
        default:
            return state;
    }
}

export default InstitutionReducer;