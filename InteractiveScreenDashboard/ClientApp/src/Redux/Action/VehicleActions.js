import { vehicleConstants } from "../../constants/vehicleConstants";
import { MockServerData } from '../../constants/MockServerData';


export function getVehiclesForInstitutionID() {
    return dispatch => {
        dispatch(VehicleDataRequest());
        dispatch(VehickeDataReceived(MockServerData.VehicleMockServerData))
    }
}

function VehicleDataRequest() {
    return { type: vehicleConstants.getVehicles_REQUEST }
};

function VehickeDataReceived(vehicles) {
    return { type: vehicleConstants.getVehicles_SUCCESS, payload: vehicles }
};

function formatDatatoRenderUI(vehicles) {

}


export function getInstitutionForId(id) {
    return dispatch => {
        dispatch(IstitutionDataRequest());
        dispatch(InstitutionDataReceived(MockServerData.InstitutionMockServerData));
    }
}

function IstitutionDataRequest() {
    return { type: vehicleConstants.getInstitutions_REQUEST }
};

function InstitutionDataReceived(institution) {
    return { type: vehicleConstants.getInstitutions_SUCCESS, payload: institution }
};