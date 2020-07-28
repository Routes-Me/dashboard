import { vehicleConstants } from "../../constants/vehicleConstants";
import { MockServerData } from '../../constants/MockServerData';
import { vehicles } from "../../components/vehicles";


//const SampleInsitutionsIdArgument = { "institutionIds": [{ "Id": 3 }] };

//Action to getVehicleList for Vehicles Component
export function getVehiclesForInstitutionID() {
    return dispatch => {
        dispatch(VehicleDataRequest());
        //const MockInstitutions = MockApiCallForInstitutions(3);
        const MockVehicles = MockAPICallForVehicles(3)
        const FormatedVehicle = MockVehicles.map(x => ({
            id: x.vehicleId,
            institution: FilterInstitutionsForId(x.institutionId),
            plateNumber: x.plateNumber,
            model: FilterModelsforId(x.modelId),
            deviceId: x.deviceId,
            modelYear: x.modelYear
        }))
        dispatch(storeVehicleData(FormatedVehicle))
    }
}

//Action to getModels for dropdown in vehicles Component
export function getModels() {
    return dispatch => {
        dispatch(ModelDataRequest)
        dispatch(storeModelData(returnModelsByMockAPICallforModels))
    }
}


//Action to Add vehcile
export function saveVehicle(vehicle) {

    return dispatch => {
        dispatch(saveVehicleRequest(vehicle))
        dispatch(saveVehicleSucces(vehicle))
    }

}

//Action to Delete vehicle
export function deleteVehicle(vehcileId) {
    return dispatch => {
        
    }
}

//Dispatch Action to update application state
function ModelDataRequest() {
    return { type: vehicleConstants.getModels_REQUEST }
}

function storeModelData(models) {
    return { type: vehicleConstants.getInstitutions_SUCCESS, payload:models }
}


function VehicleDataRequest() {
    return { type: vehicleConstants.getInstitutions_REQUEST }
}

function storeVehicleData(vehicles) {
    return { type: vehicleConstants.getVehicles_SUCCESS, payload: vehicles }
}

function saveVehicleRequest(vehicle) {
    return { type: vehicleConstants.addVehicle_REQUEST, payload: vehicle }
}

function saveVehicleSucces(vehicle) {
    return { type: vehicleConstants.addVehicle_SUCCESS, payload: vehicle }
}



//Would replaced by the actual API
function returnInstitutionsByMockAPICallforInstitutions() {
    return MockServerData.InstitutionMockServerData;
}

function returnModelsByMockAPICallforModels() {
    return MockServerData.ModelMockServerData;
}

//function returnMockModels() {
//    return MockServerData.ModelMockServerData;
//}


//Filter fetched Data
function FilterInstitutionsForId(Institutionid) {
    const ListofInsts = returnInstitutionsByMockAPICallforInstitutions().institutionDetails.data.institution;
    const ListofFilteredInst = ListofInsts.filter(x => x.institutionId === Institutionid);
    return ListofFilteredInst[0];
}

function FilterModelsforId(modelId) {
    const ListofModel = returnModelsByMockAPICallforModels().manuFacturersDetails.data.carModels;
    const ListofFilteredModel = ListofModel.filter(x => x.modelId === modelId);
    return ListofFilteredModel[0];
}



function MockAPICallForVehicles(InstId) {
    const res = MockServerData.VehicleMockServerData;
    const VehicleList = res.vehiclesDetail.data.vehicles;
    return VehicleList.filter(vehicle => vehicle.institutionId);
}


function returnMockVehiclesForInstitutionIds() {
    return MockServerData.VehicleMockServerData
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