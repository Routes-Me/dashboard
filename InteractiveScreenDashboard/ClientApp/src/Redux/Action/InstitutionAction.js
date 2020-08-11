import { MockServerData } from '../../constants/MockServerData';

export function getInstitutions(id) {

    return dispatch => {

        dispatch(IstitutionDataRequest());
        const Institutions = MockAPICallForInstitutions();
        dispatch(InstitutionDataReceived(Institutions));

    }

}


function MockAPICallForInstitutions() {
    return MockServerData.InstitutionMockServerData;
}


function IstitutionDataRequest() {
    return { type: vehicleConstants.getInstitutions_REQUEST }
};

function InstitutionDataReceived(institution) {
    return { type: vehicleConstants.getInstitutions_SUCCESS, payload: institution }
};