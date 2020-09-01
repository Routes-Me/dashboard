import axios from 'axios';
import { userConstants } from '../../constants/userConstants';
import { advertisementsConstants } from '../../constants/advertisementConstants';

export function getAdvertisements(institutionId, pageIndex) {
    return dispatch => {
        dispatch(request())
        axios.get(userConstants.Domain + 'advertisements?institutionId' + institutionId, {
            params: { queryParameter: returnQueryParamters(pageIndex, true) }
        })
            .then(
                response => { dispatch(success(returnFormatedAdvertisements(response))) },
                error => { dispatch(failure(error)) }
            )
    }
    function request() { return { type: advertisementsConstants.getAdvertisements_REQUEST };}
    function success() { return { type: advertisementsConstants.getAdvertisements_SUCCESS };}
    function failure(error) { return { type: advertisementsConstants.getAdvertisements_ERROR, payload:error };}
}


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


function returnFormatedAdvertisements(response) {
    const AdvertisementList = response.data;
    const InstitutionList = response.included.institutions;
    const MediaList = response.included.medias

    const FormatedAdvertisements = AdvertisementList.map(x => ({
        id: x.advertisementId,
        institution: InstitutionList.filter(y => y.institutionId === x.institutionId)[0],
        media: MediaList.filter(y => y.mediaId === x.mediaId)[0],
        createdAt: x.createdAt
    }))

    return FormatedAdvertisements;
}

export function addAdvertisement(advertisement) {
    return dispatch => {
        dispatch(addAdvertisementRequest())
        axios.post(userConstants.Domain + 'advertisements', advertisement)
            .then(
                response => { dispatch(savedAdvertisement(response)) },
                error => { dispatch(saveAdvertisementFailure(error)) }
            )
    }
    addAdvertisementRequest = () => { type: advertisement.addAdvertisementRequest }
    savedAdvertisement = (response) => { type: advertisement.saveAdvertisement }
    saveAdvertisementFailure = (error) => { type: advertisement.saveAdvertisementFailure }
}

export function deleteAdvertisement(id) {
    return dispatch => {
        dispatch(deleteAdvertisementRequest())
        axios.delete(userConstants.Domain + 'advertisements' + id)
            .then(
                response => { dispatch(deletedAdvertisement(response)) },
                error => { dispatch(deleteAdvertisementFailure(error)) }
            )
    }
}