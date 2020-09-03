import { MockServerData } from '../../constants/MockServerData';
import { institutionConstants } from '../../constants/institutionConstants';
import { userConstants } from '../../constants/userConstants';
import axios from 'axios';

//Get Institution list
export function getInstitutions(institutionId, pageIndex) {

    return dispatch => {

        dispatch(IstitutionDataRequest());
        axios.get(userConstants.Domain + 'institutions?' + institutionId, {
            params: { queryParameter: returnQueryParamters(pageIndex, true) }
        }).then(
            institutions => {
                dispatch(storeInstitutionsData(returnFormatedResponseForInstitutions(institutions)));
                dispatch(updatePage(institutions.pagination));
            },
            error => {
                //alert(error.toString());
            });
        //const Institutions = MockAPICallForInstitutions();
        //const servicesData = MockAPICallForInstitutions().include.services;
        //dispatch(UpdatetheServiceList(servicesData));
        //dispatch(storeInstitutionsData(Institutions));

    }

}
function IstitutionDataRequest() { return { type: institutionConstants.getInstitutions_REQUEST } };
function storeInstitutionsData(institutions) { return { type: institutionConstants.getInstitutions_SUCCESS, payload: institutions } };
function updatePage(pages) { return { type: institutionConstants.UpdatePage, payload: pages } }


function returnQueryParamters(offset, include) {

    let queryParameter;
    if (include) {
        queryParameter = {
            "offset": offset,
            "limit": userConstants.limit,
            "include": ["services"]
        }
    }
    else {
        queryParameter = {
            "offset": offset,
            "limit": userConstants.limit
        }
    }
    return queryParameter;

}

function returnFormatedResponseForInstitutions(response){
    const institutionsList = response.data.institutions;
    const servicesList = response.include.services;

    const formatedInstitutions = institutionsList.map(x => ({
        institutionId: x.institutionId,
        name: x.name,
        createdAt: x.createdAt,
        phoneNumber: x.phoneNumber,
        countryIso: x.countryIso,
        services: servicesList.filter(y => y.include(x.services))
    }))

    return formatedInstitutions;
}

//Update on API
function MockAPICallForInstitutions() {
    const institutionData = MockServerData.institutionDetails.data.institutions;
    return institutionData;
}



function UpdatetheServiceList(services) {
    return { type: institutionConstants.serviceList_UPDATED, payload: services }
}



//Save Institution Detail
export function saveInstitution(institution) {
    return dispatch => {
        dispatch(saveInstitutionRequest);
        if (institution.institutionId !== "")
        {
            //Update on API
            axios.post(userConstants.Domain + 'api/institutions' + institution).then(
                institution => {
                    dispatch(saveInstitutionSuccess);
                },
                error => {
                    //alert(error.toString());
                });
        }
        else
        {
            //Update on API
            axios.put(userConstants.Domain + 'api/institutions' + institution).then(
                institution => {
                    dispatch(saveInstitutionSuccess);
                },
                error => {
                    //alert(error.toString());
                });
        }
    }
}



function saveInstitutionRequest() {
    return { type: institutionConstants.saveInstitutions_REQUEST }
};

function saveInstitutionSuccess(institutions) {
    return { type: institutionConstants.saveInstitutions_SUCCESS, payload: institutions }
};


//Get Services 
export function getServicesList(pageIndex) {
    return dispatch => {
        dispatch(ServicesDataRequest());
        axios.get(userConstants.Domain + 'api/services?', {
            params: { queryParameter: returnQueryParamters(pageIndex, false) }
        }).then(
            services => {
                dispatch(storeServicesData(services.data.services));
            },
            error => {
                //alert(error.toString());
            });

        //const Services = MockAPICallforServices();
        //dispatch(ServicesDataReceived(Services));
    };
}
function ServicesDataRequest() { return { type: institutionConstants.getServices_REQUEST } }
function storeServicesData(Services) { return { type: institutionConstants.getServices_SUCCESS, payload: Services } }

//Update on API
function MockAPICallforServices() {
    const res = MockServerData.ServicesMockServerData;
    const services = res.data.services;
    return services;
}


