import { institutionConstants } from "../../constants/institutionConstants";
import { userConstants } from "../../constants/userConstants";
import {config} from "../../constants/config";
import apiHandler from '../../util/request';
import axios from "axios";


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
    queryParameter=entity+"?offset="+offset+"&limit="+userConstants.Pagelimit+"&include=services";
  }
  else{
    queryParameter=entity+"?offset="+offset+"&limit="+userConstants.Pagelimit;
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
    for(var i=0; i<services.length; i++){
      Services.push(servicesList.filter(y => y.ServiceId===services[i]));
    }
    
  }
  else
  {
    Services =[0];
  }
  return Services
}

function UpdatetheServiceList(services) {
  return { type: institutionConstants.serviceList_UPDATED, payload: services };
}

//Save Institution Detail
export function saveInstitution(institution,action) {
  
  let token ='eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2IiwiTmFtZSI6Im1hbmFnZXIiLCJFbWFpbCI6Im5pcm1hbDAwMTEyMzUzZDQxQGdtYWlsLmNvbSIsIlBob25lTnVtYmVyIjoiIiwiUGFzc3dvcmQiOiJSNWxHOXVNUldoZz0uYU4wbnM3eXU1bUFucVFHVUhtOEVqYVlPejRZczIyNUlUYlRtaEg1alYwbz0iLCJSb2xlcyI6Ilt7XCJBcHBsaWNhdGlvblwiOlwic2NyZWVuXCIsXCJQcml2aWxlZ2VcIjpcInN1cGVyXCJ9XSIsIkluc3RpdHV0aW9uSWQiOiIiLCJleHAiOjE2MTc2NDA1NDIsImlzcyI6IlRyYWNrU2VydmljZSIsImF1ZCI6IlRyYWNrU2VydmljZSJ9.Nf-aRwcGYRWU7xju5r9XEmJlYLdfD0o2ypH68P1k0ag'

  return (dispatch) => {
    dispatch(saveInstitutionRequest);
    if (action== "save") {                                                                                                                                                                                                       
      //Update
      axios.put(userConstants.Domain+"institutions", institution,{
        headers: { Authorization: "Bearer " + token },
        "Content-Type": "application/json; charset=utf-8",
      })
      .then(
        (institution) => {
          dispatch(saveInstitutionSuccess(institution.data));
        },
        (error) => {
          alert(error.toString());
        }
      );
    } 
    else {
      //Create
      axios.post(userConstants.Domain+"institutions" , institution,{
        headers: { Authorization: "Bearer " + token },
        "Content-Type": "application/json; charset=utf-8",
      })
      .then(
        (institution) => {
          dispatch(saveInstitutionSuccess);
        },
        (error) => {
          alert(error.toString());
        }
      );
    }
  };
}

function saveInstitutionRequest() {return { type: institutionConstants.saveInstitutions_REQUEST };}
function saveInstitutionSuccess(institutions) { return { type: institutionConstants.saveInstitutions_SUCCESS, payload: institutions}; }



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


