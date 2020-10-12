import { MockServerData } from "../../constants/MockServerData";
import { institutionConstants } from "../../constants/institutionConstants";
import { userConstants } from "../../constants/userConstants";
import {config} from "../../constants/config";
import axios from "axios";


//Get Institution list
export function getInstitutions(token, institutionId, offset) {

  return (dispatch) => {
    
    dispatch(IstitutionDataRequest());
    axios
      .get(userConstants.Domain + buildURL('institutions',1,true), {
        headers: { Authorization: "Bearer " + token },
        "Content-Type": "application/json; charset=utf-8",
      })
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
  let Services = "";
  if( services !== undefined && servicesList.length > 0)
  {
    Services = servicesList.filter(y => y.include(services));
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
export function saveInstitution(token,institution,action) {
  
  //const Token = localStorage.getItem("jwtToken").toString();
  return (dispatch) => {
    dispatch(saveInstitutionRequest);
    if (action== "save") {                                                                                                                                                                                                       
      //Update
      axios.put(userConstants.Domain + "institutions", institution,{
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
      axios.post(userConstants.Domain + "institutions" , institution, {
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
  const Token = localStorage.getItem("jwtToken").toString();
  return (dispatch)=>{
    dispatch(deleteInstitutionRequest)
    if(institutionId!= null)
    {
      axios.delete(userConstants.Domain + "institutions/"+institutionId,
      {
        headers: { Authorization: "Bearer " + Token },
        "Content-Type": "application/json; charset=utf-8"
      })
      .then(
        (institution) => {
          dispatch(deleteInstitutionSuccess(institution.data));
          getInstitutions(Token)
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
export function getServicesList(token) {
  return (dispatch) => {
    dispatch(ServicesDataRequest());
    axios.get(userConstants.Domain + buildURL('services',1), {
      headers: { Authorization: "Bearer " + token },
      "Content-Type": "application/json; charset=utf-8",
    })
    .then(
      (services) => {
        dispatch(storeServicesData([config.selectService, ...services.data.data]));
      },
      (error) => {
        alert(error.toString());
      }
    );
    //const Services = MockAPICallforServices();
    //dispatch(storeServicesData(Services));
  };
}
function ServicesDataRequest() { return { type: institutionConstants.getServices_REQUEST };}
function storeServicesData(Services) { return { type: institutionConstants.getServices_SUCCESS, payload: Services };}


