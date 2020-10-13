import { vehicleConstants } from "../../constants/vehicleConstants";
import { userConstants } from "../../constants/userConstants";
import { MockServerData } from '../../constants/MockServerData';
import {config} from "../../constants/config";
import axios from 'axios';

//const SampleInsitutionsIdArgument = { "institutionIds": [{ "Id": 3 }] };

function buildURL(entity, offset, include) {

    let queryParameter =""
    if(include){
      queryParameter=entity+"?offset="+offset+"&limit="+userConstants.Pagelimit+"&include=institutions,models";
    }
    else{
      queryParameter=entity+"?offset="+offset+"&limit="+userConstants.Pagelimit;
    }
    return queryParameter;
  
  }

//Action to getVehicleList for Vehicles Component
export function getVehiclesForInstitutionID(Token,institutionId, pageIndex) {
    institutionId = 1;
   
    return dispatch => {
        dispatch(vehicleDataRequest());                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        axios.get(userConstants.Domain +buildURL('vehicles',1,true), {
            headers: { Authorization: "Bearer " + Token },
            "Content-Type": "application/json; charset=utf-8",
          })
        .then(
        vehicles => {
                dispatch(storeVehicleData(returnFormatedVehicles(vehicles)));
                //dispatch(UpdatePage(vehicles.pagination));
        },
        error => {
            alert(error.toString());
        });

    }
}

function vehicleDataRequest() { return { type: vehicleConstants.getInstitutions_REQUEST } }
function storeVehicleData(vehicles) { return { type: vehicleConstants.getVehicles_SUCCESS, payload: vehicles } }
function UpdatePage(pages) { return { type: vehicleConstants.UpdatePage, payload:pages } }


export function getManufacturers(Token) {
    let pageIndex;
    return dispatch => {
        dispatch(MakesDataRequest());
        axios.get(userConstants.Domain +buildURL('manufacturers',1,false), {
            headers: { Authorization: "Bearer " + Token },
            "Content-Type": "application/json; charset=utf-8",
          })
        .then(
                manufacturer => {
                dispatch(StoreMakesData([config.selectMake,...manufacturer.data.data]));
                },
                error => {
                    //alert(error.toString());
                });

    }
}

//Dispatch Action to update application state
function MakesDataRequest() { return { type: vehicleConstants.getMakes_REQUEST } }
function StoreMakesData(makes) { return { type: vehicleConstants.getMakes_SUCCESS, payload: makes } }



export function getModels(Token,makeId) {
    let pageIndex;
    return dispatch => {

        dispatch(ModelDataRequest());
        axios.get(userConstants.Domain + 'manufacturers/'+makeId+'/models',{
            headers: { Authorization: "Bearer " + Token },
            "Content-Type": "application/json; charset=utf-8",
          })
        .then(
               model => {
                        dispatch(storeModelData([config.selectModel,...model.data.data]));
                    },
               error => {
                        //alert(error.toString());
            });
            //dispatch(storeModelData(returnModelsByMockAPICallforModels().manuFacturersDetails.data.carModels))
    }
}

function ModelDataRequest() { return { type: vehicleConstants.getModels_REQUEST } }
function storeModelData(models) { return { type: vehicleConstants.getModels_SUCCESS, payload: models } }




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
export function saveVehicle(vehicle,action) {
    let Token = localStorage.getItem('jwtToken').toString();
    return dispatch => {
        dispatch(saveVehicleRequest(vehicle))
        if (action== "save") {
            dispatch(vehicleDataRequest());
            axios.put(userConstants.Domain + 'vehicles',vehicle, {
                headers: { Authorization: "Bearer " + Token },
                "Content-Type": "application/json; charset=utf-8",
              })
                .then(
                    vehicle => {
                        dispatch(saveVehicleSuccess(returnFormatedVehicles(vehicle.data)));
                    },
                    error => {
                        alert(error.toString());
                    });
        } 
        else 
        {
            axios.post(userConstants.Domain + 'vehicles', vehicle, {
                headers: { Authorization: "Bearer " + Token },
                "Content-Type": "application/json; charset=utf-8",
              })
                .then(
                    vehicle => {
                        dispatch(updateVehicleSuccess(vehicle));
                    },
                    error => {
                        alert(error.toString());
                    });
            
        }
    }

}
function saveVehicleRequest(vehicle) {return { type: vehicleConstants.addVehicle_REQUEST, payload: vehicle }}

function saveVehicleSuccess(vehicle) {return { type: vehicleConstants.addVehicle_SUCCESS, payload: vehicle }}

function updateVehicleSuccess(vehicle) {console.log('Update method called for existing vehicle')}



// delete vehicle
export function deleteVehicle(vehicleId)
{
  const Token = localStorage.getItem("jwtToken").toString();
  return (dispatch)=>{
    dispatch(deleteVehicleRequest)
    if(vehicleId!= null)
    {
      axios.delete(userConstants.Domain + "vehicles/"+vehicleId,{
        headers: { Authorization: "Bearer " + Token },
        "Content-Type": "application/json; charset=utf-8",
      })
      .then(
        (vehicle) => {
          dispatch(deleteVehicleSuccess(vehicle));
        },
        (error) => {
          alert(error.toString());
        }
      );
    }
  }
}

function deleteVehicleRequest() { return {type: vehicleConstants.deleteVehicle_Request} }

function deleteVehicleSuccess(institution){ return {type: vehicleConstants.deleteVehicle_Success, payload: institution} }

function deleteVehicleError(message) { return {type: vehicleConstants.deleteVehicle_Error, payload: message} }







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

    //const VehicleList = response.data.vehicles.filter(vehicle => vehicle.institutionId === 3);
    const VehicleList = response.data.data;
    //console.log('Vehicle Action Array returned :', VehicleList);
    const InstitutionList = response.data.included.institutions;
    const ModelList = response.data.included.models;
    //const MakerList = response.include.makes;

    const FormatedVehicle = VehicleList.map(x => ({
        id: x.vehicleId,
        institution: InstitutionList.filter(y => y.InstitutionId === x.institutionId)[0],
        plateNumber: x.plateNumber,
        model: ModelList.filter(y => y.ModelId === x.modelId)[0],
        //make: MakerList.filter(y => y.makeId === x.makeId)[0],
        //deviceId: x.deviceId,
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




