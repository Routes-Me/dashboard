import { institutionConstants } from "../../constants/institutionConstants";
import {config} from "../../constants/config";
import apiHandler from '../../util/request';

//Get Institution list
export function getInstitutions(pageIndex,limit) {

  return (dispatch) => {
    
    dispatch(IstitutionDataRequest());
    apiHandler.get(buildURL('institutions', pageIndex, limit,true))
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



function buildURL(entity, pageIndex, limit, include) {

  let queryParameter =""
  if(include){
    queryParameter=entity+"?offset="+pageIndex+"&limit="+limit+"&include=services";
  }
  else{
    queryParameter=entity+"?offset="+pageIndex+"&limit="+limit;
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

  let institutions= {
    data : institutionsList.length > 0 ? formatedInstitutions : [],
    page : response.data.pagination
  }

  return institutions;

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
export function getServicesList(pageIndex, limit) {
  return (dispatch) => {
    dispatch(ServicesDataRequest());
    apiHandler.get(buildURL('services', pageIndex , limit))
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


