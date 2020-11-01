import { institutionConstants } from "../../constants/institutionConstants";
import {config} from "../../constants/config";
import apiHandler from '../../util/request';

//Get Institution list
export function getInstitutions(institutionId, offset) {

  return (dispatch) => {
    
    dispatch(IstitutionDataRequest());
    apiHandler.get(buildURL('institutions',1,true))
      .then(
        (institutions) => {
          dispatch(
            storeInstitutionsData(
              returnFormatedResponseForInstitutions(institutions)
            )
          );
          dispatch(updatePage(institutions.data.pagination));
        },
        (error) => {
          alert(error.toString());
        }
      );
  };

  function IstitutionDataRequest() { return { type: institutionConstants.getInstitutions_REQUEST }; }
  function storeInstitutionsData(institutions) { return { type: institutionConstants.getInstitutions_SUCCESS, payload: institutions }; }
  function updatePage(pages) { return { type: institutionConstants.updatePage, payload: pages };}

}



function buildURL(entity, offset, include) {

  let queryParameter =""
  if(include){
    queryParameter=entity+"?offset="+offset+"&limit="+config.Pagelimit+"&include=services";
  }
  else{
    queryParameter=entity+"?offset="+offset+"&limit="+config.Pagelimit;
  }
  return queryParameter;

}

function returnFormatedResponseForInstitutions(response) {

  const institutionsList = response.data.data;
  const servicesList = response.data.included.services;

  const formatedInstitutions = institutionsList.map((x) => ({
    institutionId: x.institutionId,
    name: x.name,
    createdAt: x.createdAt,
    phoneNumber: x.phoneNumber,
    countryIso: x.countryIso,
    services: filterServiceList(servicesList, x.services)
  }));

  return formatedInstitutions;

}

function filterServiceList(servicesList, services)
{
  let Services = [];
  if( services !== null && servicesList.length > 0)
  {
    // for(var i=0; i<services.length; i++){
    //   Services.push(servicesList.filter(y => y.ServiceId===services[i]));
    // }
    return services;
  }
  else
  {
    Services =[0];
  }
  return Services;
}

function UpdatetheServiceList(services) {
  return { type: institutionConstants.serviceList_UPDATED, payload: services };
}

//Save Institution Detail
export function saveInstitution(institution,action) {

  return (dispatch) => {
    dispatch(saveInstitutionRequest);
    if (action== "save") {                                                                                                                                                                                                       
      //Update
      apiHandler.put("institutions", institution)
      .then(
        (institution) => {
          dispatch(saveInstitutionSuccess());
        },
        (error) => {
          alert(error.toString());
        }
      );
    } 
    else {
      //Create
      apiHandler.post("institutions" , institution)
      .then(
        (institution) => {
          dispatch(saveInstitutionSuccess());
        },
        (error) => {
          alert(error.toString());
        }
      );
    }
  };
}

function saveInstitutionRequest() {return { type: institutionConstants.saveInstitutions_REQUEST };}
function saveInstitutionSuccess() { return { type: institutionConstants.saveInstitutions_SUCCESS }; }



// delete institution
export function DeleteInstitution(institutionId)
{
  return (dispatch)=>{
    dispatch(deleteInstitutionRequest)
    if(institutionId!= null)
    {
      apiHandler.delete("institutions/"+institutionId)
      .then(
        (institution) => {
          getInstitutions();
          dispatch(deleteInstitutionSuccess(institution.data));
        },
        (error) => {
          alert(error.toString());
        }
      );
    }
  }
}

function deleteInstitutionRequest() { return {type: institutionConstants.deleteInstitutionRequest} }
function deleteInstitutionSuccess(institution){ return {type: institutionConstants.deleteInstitutionSuccess, payload: institution}}
function deleteInstitutionError(message){ return {type: institutionConstants.deleteInstitutionError, payload: message}}

//Get Services
export function getServicesList() {
  return (dispatch) => {
    dispatch(ServicesDataRequest());
    apiHandler.get(buildURL('services',1))
    .then(
      (services) => {
        dispatch(storeServicesData([config.selectService, ...services.data.data]));
      },
      (error) => {
        alert(error.toString());
      }
    );
  };
}
function ServicesDataRequest() { return { type: institutionConstants.getServices_REQUEST };}
function storeServicesData(Services) { return { type: institutionConstants.getServices_SUCCESS, payload: Services };}


