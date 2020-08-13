import { vehicleConstants } from '../../constants/vehicleConstants';

const INITIAL_STATE = {
    Vehicles: [],
    Models: [],
    Institution :'',
    Loading: true,
    hasError: false,
    error:null
}

const VehicleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case vehicleConstants.getVehicles_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case vehicleConstants.getVehicles_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Vehicles: action.payload
            };
        case vehicleConstants.getInstitutions_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case vehicleConstants.getInstitutions_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Institution: action.payload
            };
        case vehicleConstants.getModels_REQUEST:
            return {
                ...state,
                Loading: false,
                hasError: false
            };
        case vehicleConstants.getModels_SUCCESS:
            return {
                ...state,
                Loading: true,
                hasError: false,
                Models: action.payload
            };
        case vehicleConstants.addVehicle_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false,
                Institution: action.payload
            };
        case vehicleConstants.addVehicle_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Institution: action.payload
            };
        default:
            return state;

    }
}

export default VehicleReducer;