﻿import axios from 'axios';
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

export function uploadMedia(mediaFile) {

    const formData = new FormData();
    formData.append("File", mediaFile[0])

    return dispatch => {
        dispatch(requestUpload);
        const options = {
            onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total)
            console.log(`${loaded}kb / ${total}kb | ${percent}`);
            }
        }
        var url = userConstants.Domain + 'advertisements/convert';
        try {
            axios.post(url, formData).then(
                response => {
                    dispatch(uploadSuccessful(response));
                    console.log(response);
                },
                error => {
                    dispatch(uploadError(error));
                }
            )
        }
        catch (ex) {
            console.log(ex);
        }
        
    }

    function requestUpload() { return { type: advertisementsConstants.uploadMedia_REQUEST }; }
    function uploadSuccessful(response) { return { type: advertisementsConstants.uploadMedia_SUCCESS, payload: response }; }
    function uploadError(error) { return { type: advertisementsConstants.uploadMedia_ERROR, payload: error }; }
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
    function addAdvertisementRequest() { return { type: advertisementsConstants.saveAdvertisements_REQUEST }; }
    function savedAdvertisement(response) { return { type: advertisementsConstants.saveAdvertisements_SUCCESS, payload:response }; }
    function saveAdvertisementFailure(error) { return { type: advertisementsConstants.saveAdvertisements_ERROR, payload:error }; }
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
    function deleteAdvertisementRequest() { return { type: advertisementsConstants.deleteAdvertisements_REQUEST }; }
    function deletedAdvertisement(response) { return { type: advertisementsConstants.deleteAdvertisements_SUCCESS, payload: response }; }
    function deleteAdvertisementFailure(error) { return { type: advertisementsConstants.deleteAdvertisements_ERROR, payload: error }; }
}


export function getCampaigns() {
    return dispatch => {
        dispatch(getCampaignRequest())
        axios.get(userConstants.Domain + 'advertisements/campaigns')
            .then(
                response => { dispatch(getCampaignsSuccess(response)) },
                error => { dispatch(getCampaignsFailure(error)) }
            )
    }
    function getCampaignRequest() { return { type: advertisementsConstants.getCampaigns_REQUEST }; }
    function getCampaignsSuccess(response) { return { type: advertisementsConstants.getCampaigns_SUCCESS, payload: response }; }
    function getCampaignsFailure(error) { return { type: advertisementsConstants.getCampaigns_ERROR, payload: error }; }

}

export function getDayIntervals() {
    return dispatch => {
        dispatch(getDayIntervalRequest())
        axios.get(userConstants.Domain + 'advertisements/dayintervales')
            .then(
                response => { dispatch(getDayIntervalSuccess(response)) },
                error => { dispatch(getDayIntervalsFailure(error)) }
            )
    }
    function getDayIntervalRequest() { return { type: advertisementsConstants.getDayIntervals_REQUEST }; }
    function getDayIntervalSuccess(response) { return { type: advertisementsConstants.getDayIntervalSuccess, payload: response }; }
    function getDayIntervalsFailure(error) { return { type: advertisementsConstants.getDayIntervals_ERROR, payload: error }; }
}