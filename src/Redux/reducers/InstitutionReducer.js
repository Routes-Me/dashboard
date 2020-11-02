import { institutionConstants } from '../../constants/institutionConstants';

const INITIAL_STATE = {
    Institutions: [],
    Services: [],
    Page: "",
    Loading: true,
    hasError: false,
    error: null,
    ActionState: ''
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
        case institutionConstants.saveInstitutions_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false,
                ActionState: institutionConstants.saveInstitutions_REQUEST
            };
        case institutionConstants.saveInstitutions_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                ActionState: institutionConstants.saveInstitutions_SUCCESS
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
        case institutionConstants.deleteInstitutionRequest:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case institutionConstants.deleteInstitutionSuccess:
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
            };
        default:
            return state;
    }
}

export default InstitutionReducer;