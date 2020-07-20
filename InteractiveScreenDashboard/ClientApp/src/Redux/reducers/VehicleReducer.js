import { vehicleConstants } from '../../constants/vehicleConstants';

const INITIAL_STATE = {
    Vehicles =[],
    Institutions =[],
    Loading: true,
    hasError: false,
    error:null
}

const VehicleReducer = (state = {}, action) => {
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
                Institutions: action.payload
            }

    }
}