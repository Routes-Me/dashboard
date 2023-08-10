import { vehicleConstants } from "../../constants/vehicleConstants";

const INITIAL_STATE = {
  Vehicles: [],
  Makes: [],
  Models: [],
  Devices: [],
  Page: "",
  Loading: true,
  hasError: false,
  error: "",
  ActionState: "",
  VehicleDetail: "",
};

const VehicleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case vehicleConstants.getVehicles_REQUEST:
      return {
        ...state,
        Loading: true,
        hasError: false,
      };
    case vehicleConstants.getVehicles_SUCCESS:
      return {
        ...state,
        Loading: false,
        hasError: false,
        Vehicles: action.payload,
        Devices: [],
        ActionState: vehicleConstants.getVehicles_SUCCESS,
      };
    case vehicleConstants.getModels_REQUEST:
      return {
        ...state,
        Loading: false,
        hasError: false,
      };
    case vehicleConstants.getModels_SUCCESS:
      return {
        ...state,
        Loading: true,
        hasError: false,
        Models: action.payload,
      };
    case vehicleConstants.getMakes_REQUEST:
      return {
        ...state,
        Loading: false,
        hasError: false,
      };
    case vehicleConstants.getMakes_SUCCESS:
      return {
        ...state,
        Loading: true,
        hasError: false,
        Makes: action.payload,
      };
    case vehicleConstants.getDevices_REQUEST:
      return {
        ...state,
        Loading: true,
        hasError: false,
      };
    case vehicleConstants.getDevices_SUCCESS:
      return {
        ...state,
        Loading: false,
        hasError: false,
        Devices: action.payload,
      };
    case vehicleConstants.addVehicle_REQUEST:
      return {
        ...state,
        Loading: true,
        hasError: false,
      };
    case vehicleConstants.addVehicle_SUCCESS:
      return {
        ...state,
        Loading: false,
        hasError: false,
        ActionState: vehicleConstants.addVehicle_SUCCESS,
        error: action.payload,
      };
    case vehicleConstants.Vehicle_ERROR:
      return {
        ...state,
        Loading: false,
        hasError: true,
        ActionState: vehicleConstants.Vehicle_ERROR,
        error: action.payload,
      };
    case vehicleConstants.deleteVehicle_Request:
      return {
        ...state,
        Loading: true,
        hasError: false,
      };
    case vehicleConstants.SEARCHVEHICLE_REQUEST:
      return {
        ...state,
        Loading: true,
        hasError: false,
      };
    case vehicleConstants.SEARCHVEHICLE_SUCCESS:
      return {
        ...state,
        Loading: false,
        hasError: false,
        Vehicles: action.payload,
      };
    case vehicleConstants.deleteVehicle_Success:
      return {
        ...state,
        Loading: false,
        hasError: false,
        ActionState: vehicleConstants.addVehicle_SUCCESS,
      };
    case vehicleConstants.showVehicleDetail:
      return {
        ...state,
        VehicleDetail: action.payload,
      };
    case vehicleConstants.updatePage:
      return {
        ...state,
        Loading: false,
        hasError: false,
        Page: action.payload,
      };
    default:
      return state;
  }
};

export default VehicleReducer;
