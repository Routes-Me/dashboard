﻿import { vehicleConstants } from "../../constants/vehicleConstants";
import { config } from "../../constants/config";
import apiHandler from '../../util/request';
import { convertObjectKeyToLowerCase, returnEntityForInstitution } from '../../util/basic';

//const SampleInsitutionsIdArgument = { "institutionIds": [{ "Id": 3 }] };

function buildURL(entity, pageIndex, limit, include, role, user) {

  let queryParameter = "";
  entity = returnEntityForInstitution(entity, role, user);

  if (include) {
    queryParameter = entity + "?offset=" + pageIndex + "&limit=" + limit + "&include=institutions,models,manufacturers";
  }
  else {
    queryParameter = entity + "?offset=" + pageIndex + "&limit=" + limit;
  }
  return queryParameter;

}

export function getVehicleDetails(vehicleId) {
  return dispatch => {
    dispatch(vehicleDataRequest())

    apiHandler.get(`vehicles/${vehicleId}?offset=1&limit=1&include=institutions,models,manufacturers`)
      .then(
        vehicle => {
          dispatch(showVehicleDetails(returnFormatedVehicles(vehicle).data[0]));
        },
        error => {
          alert(`getVehicleDetails ${error.toString()}`);
        });

  }
}


function showVehicleDetails(vehicle) {
  return { type: vehicleConstants.showVehicleDetail, payload: vehicle }
}

function showerror(error) {
  alert(`getVehicleDetails error ${error}`)
}



//Toggled for configuration issue
export function getVehiclesForInstitutionID(pageIndex, limit, role, user) {
  return dispatch => {
    dispatch(vehicleDataRequest());
    apiHandler.get(buildURL('vehicles', pageIndex, limit, true, role, user))
      .then(
        vehicles => {
          dispatch(storeVehicleData(returnFormatedVehicles(vehicles)));
        },
        error => {
          alert(`getVehicle ${error.toString()}`);
        });
  }
}

function vehicleDataRequest() { return { type: vehicleConstants.getInstitutions_REQUEST } }
function storeVehicleData(vehicles) { return { type: vehicleConstants.getVehicles_SUCCESS, payload: vehicles } }
function UpdatePage(pages) { return { type: vehicleConstants.UpdatePage, payload: pages } }


export function getManufacturers() {
  let pageIndex;
  return dispatch => {
    dispatch(MakesDataRequest());
    apiHandler.get('manufacturers')
      .then(
        manufacturer => {
          dispatch(StoreMakesData([config.selectMake, ...manufacturer.data.data]));
        },
        error => {
          alert(`getManufacturers ${error.toString()}`);
        });
  }
}

//Dispatch Action to update application state
function MakesDataRequest() { return { type: vehicleConstants.getMakes_REQUEST } }
function StoreMakesData(makes) { return { type: vehicleConstants.getMakes_SUCCESS, payload: makes } }



export function getModels(makeId) {
  let pageIndex;
  return dispatch => {

    dispatch(ModelDataRequest());
    apiHandler.get('manufacturers/' + makeId + '/models')
      .then(
        model => {
          dispatch(storeModelData([config.selectModel, ...model.data.data]));
        },
        error => {
          alert(`getModels ${error.toString()}`);
        });
  }
}

function ModelDataRequest() { return { type: vehicleConstants.getModels_REQUEST } }
function storeModelData(models) { return { type: vehicleConstants.getModels_SUCCESS, payload: models } }


export function getDevicesForVehicleId(vehicleId) {
  return dispatch => {
    dispatch(StoreDevicesRequest());
    apiHandler.get(`vehicles/${vehicleId}/devices`)
      .then(
        devices => {
          dispatch(storeDevicesForVehicleId(devices.data.data))
        },
        error => {
          alert(`getDevices : ${error.toString()}`)
        }
      )
  }
}
function StoreDevicesRequest() { return { type: vehicleConstants.getDevices_REQUEST } }
function storeDevicesForVehicleId(devices) { return { type: vehicleConstants.getDevices_SUCCESS, payload: devices } }






//Action to Add or Update vehcile
export function saveVehicle(vehicle, action) {
  return dispatch => {
    dispatch(saveVehicleRequest(vehicle))
    if (action == "save") {
      apiHandler.put(`vehicles/${vehicle.VehicleId}`, vehicle)
        .then(
          vehicle => {
            dispatch(saveVehicleSuccess(vehicle));
          },
          error => {
            alert(error.toString());
          });
    }
    else {
      apiHandler.post('vehicles', vehicle)
        .then(
          vehicle => {
            dispatch(saveVehicleSuccess(vehicle));
          },
          error => {
            alert(error.toString());
          });
    }
  }

}
function saveVehicleRequest(vehicle) { return { type: vehicleConstants.addVehicle_REQUEST, payload: vehicle } }

function saveVehicleSuccess(vehicle) { return { type: vehicleConstants.addVehicle_SUCCESS, payload: vehicle } }




// delete vehicle
export function deleteVehicle(vehicleId) {
  return (dispatch) => {
    dispatch(deleteVehicleRequest)
    if (vehicleId != null) {
      apiHandler.delete(`vehicles/${vehicleId}`)
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

function deleteVehicleRequest() { return { type: vehicleConstants.deleteVehicle_Request } }

function deleteVehicleSuccess(institution) { return { type: vehicleConstants.deleteVehicle_Success, payload: institution } }

function deleteVehicleError(message) { return { type: vehicleConstants.deleteVehicle_Error, payload: message } }



function returnFormatedVehicles(response) {

  const VehicleList = response.data.data;
  const InstitutionList = response.data.included.institutions;
  const ModelList = response.data.included.models;
  const ManufacturerList = response.data.included.manufacturers;
  let formattedResponse = [];

  VehicleList.map(x => {

    let modelObj = ModelList?.filter(y => y.modelId === x.modelId)[0];
    let manufacturerObj = ManufacturerList?.filter(y => y.manufacturerId === modelObj?.manufacturerId)[0];
    let institutionObj = InstitutionList?.filter(y => y.institutionId === x.institutionId)[0];

    modelObj = modelObj && convertObjectKeyToLowerCase(modelObj);
    manufacturerObj = manufacturerObj && convertObjectKeyToLowerCase(manufacturerObj);
    institutionObj = institutionObj && convertObjectKeyToLowerCase(institutionObj);

    const formattedObj = {
      id: x.vehicleId,
      institution: institutionObj,
      plateNumber: x.plateNumber,
      model: modelObj,
      manufacturer: manufacturerObj,
      modelYear: x.modelYear
    }

    formattedResponse.push(formattedObj);
  })



  let vehicles = {
    data: formattedResponse,
    page: response.data.pagination
  }
  console.log('Formatted Vehicles List ', vehicles);
  return convertObjectKeyToLowerCase(vehicles);
}

function filterObjecteList(objectList, elements) {
  let Objects = "";
  if (elements !== undefined && objectList.length > 0) {
    Objects = objectList.filter(y => y.include(elements));
  }
  else {
    Objects = [0];
  }
  return Objects
}




