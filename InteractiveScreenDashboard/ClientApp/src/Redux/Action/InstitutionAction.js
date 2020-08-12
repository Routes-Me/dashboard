import { MockServerData } from '../../constants/MockServerData';
import { institutionConstants } from '../../constants/institutionConstants';

export function getInstitutions(id) {

    return dispatch => {

        dispatch(IstitutionDataRequest());
        const Institutions = MockAPICallForInstitutions();
        dispatch(InstitutionDataReceived(Institutions));

    }

}


function MockAPICallForInstitutions() {
    const res = MockServerData.InstitutionMockServerData;
    const InstitutionList = res.institutionDetails.data
    return InstitutionList;
}


function IstitutionDataRequest() {
    return { type: institutionConstants.getInstitutions_REQUEST }
};

function InstitutionDataReceived(institutions) {
    return { type: institutionConstants.getInstitutions_SUCCESS, payload: institutions }
};