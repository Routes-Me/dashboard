import { vehicleConstants } from '../../constants/vehicleConstants';

const INITIAL_STATE = {
    Vehicles: [],
    Makes:[],
    Models: [],
    Page: "",
    loading: true,
    hasError: false,
    error:null
}

const VehicleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case vehicleConstants.getVehicles_REQUEST:
            return {
                ...state,
                loading: true,
                hasError: false
            };
        case vehicleConstants.getVehicles_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                Vehicles: action.payload
            };
        case vehicleConstants.getModels_REQUEST:
            return {
                ...state,
                loading: false,
                hasError: false
            };
        case vehicleConstants.getModels_SUCCESS:
            return {
                ...state,
                loading: true,
                hasError: false,
                Models: action.payload
            };
        case vehicleConstants.getMakes_REQUEST:
            return {
                ...state,
                loading: false,
                hasError: false
            };
        case vehicleConstants.getMakes_SUCCESS:
            return {
                ...state,
                loading: true,
                hasError: false,
                Makes: action.payload
            };
        case vehicleConstants.addVehicle_REQUEST:
            return {
                ...state,
                loading: true,
                hasError: false
            };
        case vehicleConstants.addVehicle_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false
            };
        case vehicleConstants.deleteVehicle_Request:
            return {
                ...state,
                loading: true,
                hasError: false
            };
        case vehicleConstants.deleteVehicle_Success:
            return {
                ...state,
                loading: false,
                hasError: false
            };
        case vehicleConstants.updatePage:
            return {
                ...state,
                loading: false,
                hasError: false,
                Page: action.payload
            };
        default:
            return state;

    }
}

export default VehicleReducer;