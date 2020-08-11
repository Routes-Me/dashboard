import { vehicleConstants } from "../../constants/vehicleConstants";
import { MockServerData } from '../../constants/MockServerData';


//const SampleInsitutionsIdArgument = { "institutionIds": [{ "Id": 3 }] };

//Action to getVehicleList for Vehicles Component
export function getVehiclesForInstitutionID() {
    return dispatch => {
        dispatch(VehicleDataRequest());
        //const MockInstitutions = MockApiCallForInstitutions(3);
        const FormatedVehicle = MockAPICallForVehicles(3)
        console.log('data formated ');
        dispatch(storeVehicleData(FormatedVehicle))
    }
}

//Action to getModels for dropdown in vehicles Component
export function getModels() {
    return dispatch => {
        dispatch(ModelDataRequest)
        dispatch(storeModelData(returnModelsByMockAPICallforModels().manuFacturersDetails.data.carModels))
    }
}


//Action to Add or Update vehcile
export function saveVehicle(vehicle) {

    return dispatch => {
        dispatch(saveVehicleRequest(vehicle))
        if (vehicle.id !== "") {
            dispatch(saveVehicleSuccess(vehicle))
        } else {
            dispatch(updateVehicleSuccess(vehicle))
        }
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
    return { type: vehicleConstants.getModels_SUCCESS, payload:models }
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

function saveVehicleSuccess(vehicle) {
    return { type: vehicleConstants.addVehicle_SUCCESS, payload: vehicle }
}

function updateVehicleSuccess(vehicle) {
    console.log('Update method called for existing vehicle');
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
    const VehicleList = res.vehiclesDetail.data.vehicles.filter(vehicle => vehicle.institutionId === InstId)
    console.log('Vehicle Action Array returned :', VehicleList);
    const InstitutionList = res.vehiclesDetail.data.include.institutions;
    const ModelList = res.vehiclesDetail.data.include.models;

    
    const FormatedVehicle = VehicleList.map(x => ({
        id: x.vehicleId,
        institution: InstitutionList.filter(y => y.institutionId === x.institutionId)[0],
        plateNumber: x.plateNumber,
        model: ModelList.filter(y => y.modelId === x.modelId)[0],
        deviceId: x.deviceId,
        modelYear: x.modelYear
    }))

    return FormatedVehicle;
}


function filterModelIdFromModelArray() {

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