import axios from 'axios';
import { userConstants } from '../../constants/userConstants';
import { advertisementsConstants } from '../../constants/advertisementConstants';
import Resizer from 'react-image-file-resizer';
import { onImageCompress } from '../../util/Compress';
import apiHandler from '../../util/request';


export function getAdvertisements(institutionId, pageIndex) {
    return dispatch => {
        dispatch(request())
        apiHandler.get(buildURL('advertisements',1,true))
            .then(
                response => { dispatch(success(returnFormatedAdvertisements(response))) },
                error => { dispatch(failure(error)) }
            )
    }
    function request() { return { type: advertisementsConstants.getAdvertisements_REQUEST };}
    function success(response) { return { type: advertisementsConstants.getAdvertisements_SUCCESS, payload:response };}
    function failure(error) { return { type: advertisementsConstants.getAdvertisements_ERROR, payload:error };}
}

const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 160, 600, 'JPEG', 100, 0,
        uri => {
            resolve(uri);
        }
    );
});

function dataURLtoFile(dataurl, filename) {

    var urlStr = dataurl + "";
    var arr = urlStr.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}




export function uploadMedia(mediaFile, fileType) {

    //const compressedImage = await resizeFile(mediaFile);

    let file = mediaFile;
    if (fileType==='image') {
        //const compressedImage = await onImageCompress(mediaFile);
        file = dataURLtoFile(mediaFile, "compressedImageFile.jpg");
    }


    const formData = new FormData();
    formData.append("File", file);

    return dispatch => {
        dispatch(requestUpload);
        
        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb / ${total}kb | ${percent}`);
            }
        };

        var url = userConstants.Domain + 'advertisements/convert';
        try {
            axios.post(url, formData, options).then(
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



export function compressMedia(mediaFile) {

    
}

export function onTitleChange(text) {
    return dispatch => {
        dispatch(updateTitleOnSimulater(text))
    }
    function updateTitleOnSimulater(text) { return { type: advertisementsConstants.onPromotions_TitleChange, payload: text }; }
}

export function onSubTitleChange(text) {
    return dispatch => {
        dispatch(updateSubTitleOnSimulator(text))
    }
    function updateSubTitleOnSimulator(text) { return { type: advertisementsConstants.onPromotions_SubTitleChange, payload: text }; }
}


export function onAdvertisementClick(index) {
    return dispatch => {
        dispatch(onTabClick(index))
    }
    function onTabClick(index) { return { type: advertisementsConstants.onAdvertisement_Clicked, payload: index }; }
}

export function onMediaInput(file) {
    return dispatch => {
        dispatch(updateMedia(file))
    }
    function updateMedia(file) { return { type: advertisementsConstants.onAdvertisment_MediaSelected, payload: file }; }
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


function buildURL(entity, offset, include) {

    let queryParameter =""
    if(include){
      queryParameter=entity+"?offset="+offset+"&limit="+userConstants.Pagelimit+"&include=media,institution";
    }
    else{
      queryParameter=entity+"?offset="+offset+"&limit="+userConstants.Pagelimit;
    }
    return queryParameter;

}


function returnFormatedAdvertisements(response) {
    const AdvertisementList = response.data.data
    const InstitutionList = response.data.included.institution
    const MediaList = response.data.included.media 

    const FormatedAdvertisements = AdvertisementList?.map(x => ({
        id: x.advertisementId,
        resourceName: x.resourceName,
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