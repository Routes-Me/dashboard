import { MockServerData } from '../../constants/MockServerData';
import { institutionConstants } from '../../constants/institutionConstants';


//Get Institution list
export function getInstitutions(id) {

    return dispatch => {

        dispatch(IstitutionDataRequest());
        const Institutions = MockAPICallForInstitutions().data.institutions;
        const servicesData = MockAPICallForInstitutions().include.services;
        dispatch(UpdatetheServiceList(servicesData));
        dispatch(InstitutionDataReceived(Institutions));

    }

}

//Update on API
function MockAPICallForInstitutions() {
    const institutionData = MockServerData.institutionDetails;
    return institutionData;
}


function IstitutionDataRequest() {
    return { type: institutionConstants.getInstitutions_REQUEST }
};

function UpdatetheServiceList(services) {
    return { type: institutionConstants.serviceList_UPDATED, payload: services }
}

function InstitutionDataReceived(institutions) {
    return { type: institutionConstants.getInstitutions_SUCCESS, payload: institutions }
};


//Save Institution Detail
export function saveInstitution(institution) {
    return dispatch => {
        dispatch(saveInstitutionRequest);
        if (institution.institutionId !== "")
        {
            //Update on API
            MockAPICallforPutInstitution(institution);
        }
        else
        {
            //Update on API
            MockAPICallForPostInstitution(institution);
        }
        dispatch(saveInstitutionSuccess);
    }
}

//Update on API
function MockAPICallForPostInstitution(institution)
{
    console.log("Dictionary for the create institution API", institution);
}

//Update on API
function MockAPICallforPutInstitution(institution)
{
    console.log("Dictionary for the update institution API", institution);
}

function saveInstitutionRequest() {
    return { type: institutionConstants.saveInstitutions_REQUEST }
};

function saveInstitutionSuccess(institutions) {
    return { type: institutionConstants.saveInstitutions_SUCCESS, payload: institutions }
};


//Get Services 
export function getServicesList() {
    return dispatch => {
        dispatch(ServicesDataRequest());
        const Services = MockAPICallforServices();
        dispatch(ServicesDataReceived(Services));
    };
}


//Update on API
function MockAPICallforServices() {
    const res = MockServerData.ServicesMockServerData;
    const services = res.data.services;
    return services;
}

function ServicesDataRequest() {
    return { type: institutionConstants.getServices_REQUEST }
}

function ServicesDataReceived(Services) {
    return { type: institutionConstants.getServices_SUCCESS, payload: Services }
}