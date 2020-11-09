import { config } from '../../constants/config'
import { advertisementsConstants } from '../../constants/advertisementConstants';
import Resizer from 'react-image-file-resizer';
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


export function getCampaigns() {
    return dispatch => {
        dispatch(getCampaignRequest())
        apiHandler.get('campaigns')
            .then(
                response => { dispatch(getCampaignsSuccess(response.data.data)) },
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
        apiHandler.get('intervals')
            .then(
                response => { dispatch(getDayIntervalSuccess(response.data.data)) },
                error => { dispatch(getDayIntervalsFailure(error)) }
            )
    }
    function getDayIntervalRequest() { return { type: advertisementsConstants.getDayIntervals_REQUEST }; }
    function getDayIntervalSuccess(response) { return { type: advertisementsConstants.getDayIntervals_SUCCESS, payload: response }; }
    function getDayIntervalsFailure(error) { return { type: advertisementsConstants.getDayIntervals_ERROR, payload: error }; }
}



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


    let file = mediaFile;
    if (fileType==='image') {
        file = dataURLtoFile(mediaFile, "compressedImageFile.jpg");
    }


    const formData = new FormData();
    formData.append("media", file);
    formData.append("MediaType",fileType);
    formData.append("Size",file.size);

    return dispatch => {
        dispatch(requestUpload);
        
        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb / ${total}kb | ${percent}`);
            }
        };

        try {
            apiHandler.post('medias', formData, options).then(
                response => {
                    dispatch(uploadSuccessful(formatMediaResponse(response.data)));
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





function formatMediaResponse(media){

   const Media ={
       Url  : media.url,
       Type : returnFileType(media.url),
       Id   : media.mediaId
   }

   return Media;
}

function returnFileType(url){
    return url.substring(url.lastIndexOf('.')+1,url.length);
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






function buildURL(entity, offset, include) {

    let queryParameter =""
    if(include){
      queryParameter=entity+"?offset="+offset+"&limit="+config.Pagelimit+"&include=media,institution,campaign,interval";
    }
    else{
      queryParameter=entity+"?offset="+offset+"&limit="+config.Pagelimit;
    }
    return queryParameter;

}


function returnFormatedAdvertisements(response) {

    const AdvertisementList = response.data.data;
    const InstitutionList   = response.data.included.institution;
    const MediaList         = response.data.included.media;
    const CampaignList      = response.data.included.campaign;
    const IntervalList      = response.data.included.interval;

    const FormatedAdvertisements = AdvertisementList?.map(x => ({
        id: x.advertisementId,
        resourceName: x.resourceName,
        createdAt: x.createdAt,
        campaigns: filterCampaignList(CampaignList, x.campaignId)[0],
        institution: InstitutionList.filter(y => y.institutionId === x.institutionId)[0],
        media: MediaList.filter(y => y.mediaId === x.mediaId)[0],
        interval: IntervalList.filter(y=>y.IntervalId === x.intervalId)[0]
    }))

    return FormatedAdvertisements;
}


function filterCampaignList(CampaignList, Campaigns)
{
  let filteredList = [];
  if( Campaigns !== null && CampaignList.length > 0)
  {
    for(var i=0; i<Campaigns.length; i++){
        filteredList.push(CampaignList.filter(y => y.CampaignId===Campaigns[i]));
    }
    return filteredList;
  }
  else
  {
    filteredList =[0];
  }
  return filteredList;
}

export function addAdvertisement(advertisement) {
    return dispatch => {
        dispatch(addAdvertisementRequest())
        apiHandler.post('advertisements', advertisement)
            .then(
                response => { dispatch(savedAdvertisement(response.data)) },
                error => { dispatch(saveAdvertisementFailure(error)) }
            )
    }
    function addAdvertisementRequest() { return { type: advertisementsConstants.saveAdvertisements_REQUEST }; }
    function savedAdvertisement(advertisement) { return { type: advertisementsConstants.saveAdvertisements_SUCCESS, payload:advertisement }; }
    function saveAdvertisementFailure(error) { return { type: advertisementsConstants.saveAdvertisements_ERROR, payload:error }; }
}


export function addPromotions(promotion){
    return dispatch => {
        dispatch(addPromotionsRequest())
        apiHandler.post('promotions',promotion)
        .then(
            response => { dispatch(savePromotions(response.data))},
            error => { dispatch(savePromotionsError(error))}
        )
    }
    function addPromotionsRequest()     { return { type: advertisementsConstants.savePromotions_REQUEST }; }
    function savePromotions(promotion)  { return { type: advertisementsConstants.savePromotions_SUCCESS, payload:promotion }; }
    function savePromotionsError(error) { return { type: advertisementsConstants.savePromotions_ERROR, payload:error }; }
}


export function saveCampaign(Campaign, action) {

    return dispatch => {
        dispatch(saveCampaignRequest())
        if(action === 'save')
        {
            apiHandler.put('campaigns', Campaign)
            .then(
                response => { dispatch(saveCampaignSuccess(response.data)) },
                error => { dispatch(saveCampaignFailure(error)) }
            )
        }
        else
        {
            apiHandler.post('campaigns', Campaign)
            .then(
                response => { dispatch(saveCampaignSuccess(response.data)) },
                error => { dispatch(saveCampaignFailure(error)) }
            )
        }
    }

    function saveCampaignRequest() { return { type: advertisementsConstants.saveCampaigns_REQUEST }; }
    function saveCampaignSuccess(campaign) { return { type: advertisementsConstants.saveCampaigns_SUCCESS, payload:campaign }; }
    function saveCampaignFailure(error) { return { type: advertisementsConstants.saveCampaigns_ERROR, payload:error }; }
}

export function deleteAdvertisement(id) {
    return dispatch => {
        dispatch(deleteAdvertisementRequest())
        apiHandler.delete('advertisements/' + id)
            .then(
                response => { dispatch(deletedAdvertisement(response)) },
                error => { dispatch(deleteAdvertisementFailure(error)) }
            )
    }
    function deleteAdvertisementRequest() { return { type: advertisementsConstants.deleteAdvertisements_REQUEST }; }
    function deletedAdvertisement(response) { return { type: advertisementsConstants.deleteAdvertisements_SUCCESS, payload: response }; }
    function deleteAdvertisementFailure(error) { return { type: advertisementsConstants.deleteAdvertisements_ERROR, payload: error }; }
}

export function deleteCampaign(id) {
    return dispatch => {
        dispatch(deleteCampaignRequest())
        apiHandler.delete('campaigns/' + id)
            .then(
                response => { dispatch(deleteCampaignSuccess(response)) },
                error => { dispatch(deleteCampaignFailure(error)) }
            )
    }
    function deleteCampaignRequest() { return { type: advertisementsConstants.deleteCampaigns_REQUEST }; }
    function deleteCampaignSuccess(response) { return { type: advertisementsConstants.deleteCampaigns_SUCCESS, payload: response }; }
    function deleteCampaignFailure(error) { return { type: advertisementsConstants.deleteCampaignFailure, payload: error }; }
}

function updateAdvertisementList() { return {type: advertisementsConstants.updateTheAdvertisementList}}


