import { vehicleConstants } from "../../constants/vehicleConstants";
import { userConstants } from "../../constants/userConstants";
import { MockServerData } from '../../constants/MockServerData';
import axios from 'axios';

//const SampleInsitutionsIdArgument = { "institutionIds": [{ "Id": 3 }] };

//Action to getVehicleList for Vehicles Component
export function getVehiclesForInstitutionID(institutionId, pageIndex) {
    institutionId = 3;
    
    return dispatch => {
        dispatch(vehicleDataRequest());
        axios.get(userConstants.Domain + 'api/vehicles?' + institutionId, {
            params: { queryParameter: returnQueryParamters(pageIndex) }
        })
        .then(
        vehicles => {
                dispatch(storeVehicleData(returnFormatedVehicles(vehicles)));
                dispatch(UpdatePage(vehicles.pagination));
        },
        error => {
            alert(error.toString());
        });

        //const FormatedVehicle = MockAPICallForVehicles(institutionId, pageIndex)
        //console.log('data formated ', FormatedVehicle);
        //dispatch(storeVehicleData(FormatedVehicle));

    }
}


function vehicleDataRequest() { return { type: vehicleConstants.getInstitutions_REQUEST } }
function storeVehicleData(vehicles) { return { type: vehicleConstants.getVehicles_SUCCESS, payload: vehicles } }
function UpdatePage(pages) { return { type: vehicleConstants.UpdatePage, payload:pages } }


function returnQueryParamters(offset) {
    const queryParameter = {
        "offset": offset,
        "limit": userConstants.limit,
        "include": ["makes", "models"] 
    }
    return queryParameter;
}

//Action to getModels for dropdown in vehicles Component
export function getModels(makeId) {
    let pageIndex;
    return dispatch => {

        dispatch(ModelDataRequest());
        axios.get(userConstants.Domain + 'api/vehicles/models?' + makeId, {
                params: { queryParameter: returnQueryParamters(pageIndex) }
        })
        .then(
               model => {
                        dispatch(storeModelData(model.data.models));
                    },
               error => {
                        alert(error.toString());
            });

            dispatch(storeModelData(returnModelsByMockAPICallforModels().manuFacturersDetails.data.carModels))

    }
}

function ModelDataRequest() { return { type: vehicleConstants.getModels_REQUEST } }
function storeModelData(models) { return { type: vehicleConstants.getModels_SUCCESS, payload: models } }


export function getManufacturers() {
    let pageIndex;
    return dispatch => {
        dispatch(MakesDataRequest());
        axios.get(userConstants.Domain + 'api/vehicles/manufacturers', {
            params: { queryParameter: returnQueryParamters(pageIndex) }
        })
        .then(
                manufacturer => {
                dispatch(StoreMakesData(manufacturer.data.manufacturers));
                },
                error => {
                    alert(error.toString());
                });

    }
}

//Dispatch Action to update application state
function MakesDataRequest() { return { type: vehicleConstants.getMakes_REQUEST } }
function StoreMakesData(makes) { return { type: vehicleConstants.getMakes_SUCCESS, payload: makes } }

//get new models
export function getNewModels(makeId) {
    return dispatch => {
        dispatch(ModelDataRequest);
        const models = MockAPICallFormodels(makeId);
        dispatch(storeModelData(models));
    }
}


//get Makes
export function getMakes() {
    return dispatch => {
        dispatch(MakesDataRequest);
        const makes = MockAPICallForMakes();
        dispatch(StoreMakesData(makes));
    }
}


//Action to Add or Update vehcile
export function saveVehicle(vehicle) {

    return dispatch => {
        dispatch(saveVehicleRequest(vehicle))
        if (vehicle.id !== "") {
            dispatch(vehicleDataRequest());
            axios.post(userConstants.Domain + 'api/vehicles?' + vehicle)
                .then(
                    vehicle => {
                        dispatch(saveVehicleSuccess(vehicle));
                    },
                    error => {
                        alert(error.toString());
                    });
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

function saveVehicleRequest(vehicle) {return { type: vehicleConstants.addVehicle_REQUEST, payload: vehicle }}

function saveVehicleSuccess(vehicle) {return { type: vehicleConstants.addVehicle_SUCCESS, payload: vehicle }}

function updateVehicleSuccess(vehicle) {console.log('Update method called for existing vehicle')}





function returnModelsByMockAPICallforModels() {
    return MockServerData.ModelMockServerData;
}



function FilterModelsforId(modelId) {
    const ListofModel = returnModelsByMockAPICallforModels().manuFacturersDetails.data.carModels;
    const ListofFilteredModel = ListofModel.filter(x => x.modelId === modelId);
    return ListofFilteredModel[0];
}



function MockAPICallForVehicles(InstId,pageIndex) {

    const res = MockServerData.VehicleDetails;
    return returnFormatedVehicles(res);
}

function returnFormatedVehicles(response){
    const VehicleList = response.data.vehicles.filter(vehicle => vehicle.institutionId === 3)
    //console.log('Vehicle Action Array returned :', VehicleList);
    const InstitutionList = response.include.institutions;
    const ModelList = response.include.models;
    const MakerList = response.include.makes;

    const FormatedVehicle = VehicleList.map(x => ({
        id: x.vehicleId,
        institution: InstitutionList.filter(y => y.institutionId === x.institutionId)[0],
        plateNumber: x.plateNumber,
        model: ModelList.filter(y => y.modelId === x.modelId)[0],
        make: MakerList.filter(y => y.makeId === x.makeId)[0],
        deviceId: x.deviceId,
        modelYear: x.modelYear
    }))

    return FormatedVehicle;
}



//Update with API
function MockAPICallForMakes() {
    return MockServerData.MakeDetails.data.makes;
}

function MockAPICallFormodels() {
    return MockServerData.ModelDetails.data.models
}



//function filterModelIdFromModelArray() {

//}


function returnMockVehiclesForInstitutionIds() {
    return MockServerData.VehicleMockServerData
}


