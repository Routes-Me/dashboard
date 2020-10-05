import { MockServerData } from "../../constants/MockServerData";
import { institutionConstants } from "../../constants/institutionConstants";
import { userConstants } from "../../constants/userConstants";
import axios from "axios";



//Get Institution list
export function getInstitutions(institutionId, offset) {

  const Token = localStorage.getItem("jwtToken").toString();
  return (dispatch) => {
    // dispatch(storeInstitutionsData(MockServerData.Institutions.data));
    
    dispatch(IstitutionDataRequest());
    axios
      .get(userConstants.Domain + "institutions?offset=1&limit=10", {
        headers: { Authorization: "Bearer " + Token },
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

  function IstitutionDataRequest() {
    return { type: institutionConstants.getInstitutions_REQUEST };
  }
  function storeInstitutionsData(institutions) {
    return {
      type: institutionConstants.getInstitutions_SUCCESS,
      payload: institutions,
    };
  }
  function updatePage(pages) {
    return { type: institutionConstants.updatePage, payload: pages };
  }
}

function returnQueryParamters(offset, include) {
  let queryParameter;
  if (include) {
    queryParameter = {
      offset: offset,
      limit: userConstants.limit,
      include: ["services"],
    };
  } else {
    queryParameter = {
      offset: offset,
      limit: userConstants.limit,
    };
  }
  return queryParameter;
}

function returnFormatedResponseForInstitutions(response) {
  const institutionsList = response.data.data;
  const servicesList = MockServerData.Services.data;

  // const servicesList = response.data.included.services;

  const formatedInstitutions = institutionsList.map((x) => ({
    institutionId: x.institutionId,
    name: x.name,
    createdAt: x.createdAt,
    phoneNumber: x.phoneNumber,
    countryIso: x.countryIso,
    //services: servicesList.filter((y) => y.include(x.services))
  }));

  return formatedInstitutions;
}

//Update on API
function MockAPICallForInstitutions() {
  const institutionData = MockServerData.institutionDetails.data.institutions;
  return institutionData;
}

function UpdatetheServiceList(services) {
  return { type: institutionConstants.serviceList_UPDATED, payload: services };
}

//Save Institution Detail
export function saveInstitution(institution,action) {

  const Token = localStorage.getItem("jwtToken").toString();
  return (dispatch) => {
    dispatch(saveInstitutionRequest);
    if (action== "save") {                                                                                                                                                                                                       
      //Update
      axios.put(userConstants.Domain + "institutions", institution,{
        headers: { Authorization: "Bearer " + Token },
        "Content-Type": "application/json; charset=utf-8",
      })
      .then(
        (institution) => {
          dispatch(saveInstitutionSuccess(institution));
        },
        (error) => {
          alert(error.toString());
        }
      );
    } 
    else {
      //Create
      axios.post(userConstants.Domain + "institutions" , institution, {
        headers: { Authorization: "Bearer " + Token },
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

function saveInstitutionRequest() {
  return { type: institutionConstants.saveInstitutions_REQUEST };
}

function saveInstitutionSuccess(institutions) {
  return {
    type: institutionConstants.saveInstitutions_SUCCESS,
    payload: institutions,
  };
}

//Get Services
export function getServicesList() {
  return (dispatch) => {
    dispatch(ServicesDataRequest());
    // axios
    //   .get(userConstants.Domain + "api/services?", {
    //     params: { queryParameter: returnQueryParamters(pageIndex, false) },
    //   })
    //   .then(
    //     (services) => {
    //       dispatch(storeServicesData(services.data.services));
    //     },
    //     (error) => {
    //       //alert(error.toString());
    //     }
    //   );

    const Services = MockAPICallforServices();
    dispatch(storeServicesData(Services));
  };
}
function ServicesDataRequest() {
  return { type: institutionConstants.getServices_REQUEST };
}
function storeServicesData(Services) {
  return { type: institutionConstants.getServices_SUCCESS, payload: Services };
}

//Update on API
function MockAPICallforServices() {
  const services = MockServerData.Services.data;
  return services;
}
