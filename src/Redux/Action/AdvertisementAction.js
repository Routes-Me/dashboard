import { config } from "../../constants/config";
import { advertisementsConstants } from "../../constants/advertisementConstants";
import apiHandler from "../../util/request";
import { uploadMediaIntoBlob, dataURLtoFile } from "../../util/blobStorage";
import axios from "axios";
import cookie from "react-cookies";
let apiDomain = process.env.REACT_APP_APIDOMAIN;

export function getAdvertisements(pageIndex, limit, campaignId) {
  let include = campaignId ? false : true;

  return (dispatch) => {
    dispatch(request());
    apiHandler
      .get(
        buildURL(
          returnFilterForCampaigns(campaignId),
          pageIndex,
          limit,
          include
        )
      )
      .then(
        (response) => {
          dispatch(success(returnFormatedAdvertisements(response, include)));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
  };
  function request() {
    return { type: advertisementsConstants.getAdvertisements_REQUEST };
  }
  function success(response) {
    return {
      type: advertisementsConstants.getAdvertisements_SUCCESS,
      payload: response,
    };
  }
  function failure(error) {
    return {
      type: advertisementsConstants.getAdvertisements_ERROR,
      payload: error,
    };
  }
}

function returnFilterForCampaigns(campaignId) {
  return campaignId
    ? `campaigns/${campaignId}/advertisements`
    : `advertisements`;
}

export function getCampaigns(pageIndex, limit) {
  return (dispatch) => {
    dispatch(getCampaignRequest());
    apiHandler.get(buildURL("campaigns", pageIndex, limit, false)).then(
      (response) => {
        dispatch(getCampaignsSuccess(returnFormatedCampaigns(response)));
      },
      (error) => {
        dispatch(getCampaignsFailure(error));
      }
    );
  };
  function getCampaignRequest() {
    return { type: advertisementsConstants.getCampaigns_REQUEST };
  }
  function getCampaignsSuccess(response) {
    return {
      type: advertisementsConstants.getCampaigns_SUCCESS,
      payload: response,
    };
  }
  function getCampaignsFailure(error) {
    return { type: advertisementsConstants.getCampaigns_ERROR, payload: error };
  }
}

export function getDayIntervals() {
  return (dispatch) => {
    dispatch(getDayIntervalRequest());
    apiHandler.get("intervals").then(
      (response) => {
        dispatch(getDayIntervalSuccess(response.data.data));
      },
      (error) => {
        dispatch(getDayIntervalsFailure(error));
      }
    );
  };
  function getDayIntervalRequest() {
    return { type: advertisementsConstants.getDayIntervals_REQUEST };
  }
  function getDayIntervalSuccess(response) {
    return {
      type: advertisementsConstants.getDayIntervals_SUCCESS,
      payload: response,
    };
  }
  function getDayIntervalsFailure(error) {
    return {
      type: advertisementsConstants.getDayIntervals_ERROR,
      payload: error,
    };
  }
}

export function uploadRequest(media) {
  return (dispatch) => {
    dispatch(requestUpload(media));
  };
}

export function uploadMedia(media) {
  console.log("media", media);
  return (dispatch) => {
    // const ext = media.Url.substring(media.Url.lastIndexOf('.'))
    let mediaObj = "";

    if (media.Type === "video") {
      mediaObj = {
        Type: advertisementsConstants.video,
        Url: media.Url,
      };
    } else {
      mediaObj = {
        Type: advertisementsConstants.image,
        Url: media.Url,
      };
    }
    dispatch(uploadSuccessful(mediaObj));
  };
}

function showProgress(progress) {
  return {
    type: advertisementsConstants.progressOnMediaUpload,
    payload: progress,
  };
}
function requestUpload(media) {
  return { type: advertisementsConstants.uploadMedia_REQUEST, payload: media };
}
function uploadSuccessful(response) {
  return {
    type: advertisementsConstants.uploadMedia_SUCCESS,
    payload: response,
  };
}
function uploadError(error) {
  return { type: advertisementsConstants.uploadMedia_ERROR, payload: error };
}

function formatMediaResponse(media) {
  const Media = {
    Url: media.url,
    Type: returnFileType(media.url),
    Id: media.mediaId,
  };

  return Media;
}

function returnFileType(url) {
  return url.substring(url.lastIndexOf(".") + 1, url.length);
}

export function onTitleChange(text) {
  return (dispatch) => {
    dispatch(updateTitleOnSimulater(text));
  };
  function updateTitleOnSimulater(text) {
    return {
      type: advertisementsConstants.onPromotions_TitleChange,
      payload: text,
    };
  }
}

export function onSubTitleChange(text) {
  return (dispatch) => {
    dispatch(updateSubTitleOnSimulator(text));
  };
  function updateSubTitleOnSimulator(text) {
    return {
      type: advertisementsConstants.onPromotions_SubTitleChange,
      payload: text,
    };
  }
}

export function onAdvertisementClick(index) {
  console.log("have clicked");
  return (dispatch) => {
    dispatch(onTabClick(index));
  };
  function onTabClick(index) {
    return {
      type: advertisementsConstants.onAdvertisement_Clicked,
      payload: index,
    };
  }
}

export function onMediaInput(file) {
  return (dispatch) => {
    dispatch(updateMedia(file));
  };
  function updateMedia(file) {
    return {
      type: advertisementsConstants.onAdvertisment_MediaSelected,
      payload: file,
    };
  }
}

function buildURL(entity, pageIndex, limit, include) {
  let queryParameter = "";
  if (include) {
    queryParameter =
      entity +
      "?offset=" +
      pageIndex +
      "&limit=" +
      limit +
      "&include=media,institution,campaign,promotion";
  } else {
    queryParameter = entity + "?offset=" + pageIndex + "&limit=" + limit;
  }
  return queryParameter;
}

function returnFormatedAdvertisements(response, include) {
  let advertisments = "";
  const AdvertisementList = response.data.data;
  if (include) {
    const InstitutionList =
      response.data.included?.institution !== undefined
        ? response.data.included.institution
        : [];
    const MediaList =
      response.data.included?.media !== undefined
        ? response.data.included.media
        : [];
    const CampaignList =
      response.data.included?.campaign !== undefined
        ? response.data.included.campaign
        : [];
    const promotionsList =
      response.data.included?.promotion !== undefined
        ? response.data.included.promotion
        : [];
    //const IntervalList      = response.data.included.interval;

    const FormatedAdvertisements = AdvertisementList?.map((x) => ({
      id: x.advertisementId,
      resourceName: x.name,
      createdAt: x.createdAt,
      campaigns:
        x.campaignId.length > 0 &&
        filterCampaignList(CampaignList, x.campaignId)[0],
      institution: InstitutionList.filter(
        (y) => y.institutionId === x.institutionId
      )[0],
      media: MediaList.filter((y) => y.mediaId === x.mediaId)[0],
      intervalId: x.intervalId,
      tintColor: x.tintColor,
      promotion: promotionsList.filter(
        (y) => y.promotionId === x.promotionsId
      )[0],
    }));

    advertisments = {
      data: FormatedAdvertisements,
      page: response.data.pagination,
    };
  } else {
    advertisments = {
      data: AdvertisementList,
      page: response.data.pagination,
    };
  }

  console.log("Advertisement refined ", advertisments);
  return advertisments;
}

function returnFormatedCampaigns(response) {
  let campaigns = {
    data: response.data.data,
    page: response.data.pagination,
  };
  return campaigns;
}

function filterCampaignList(CampaignList, Campaigns) {
  let filteredList = [];
  if (Campaigns !== null && CampaignList.length > 0) {
    for (var i = 0; i < Campaigns.length; i++) {
      filteredList.push(
        CampaignList.filter((y) => y.campaignId === Campaigns[i]).map(
          (x) => x.campaignId
        )
      );
    }
    return filteredList;
  } else {
    filteredList = [0];
  }
  return filteredList;
}

export function saveAdvertisement(advertisement, oldFile) {
  let token = cookie.load("token");
  console.log(advertisement.advertisement);
  return (dispatch) => {
    dispatch(addAdvertisementRequest());
    if (advertisement !== undefined)
      uploadMediaIntoBlob(advertisement.file, oldFile) // the function that upload media
        .then((mediaURL) => {
          // check if edit or add
          if (advertisement.advertisement.advertisementId === "") {
            // Add mode
            const advertise = {
              InvertedTintColor: parseInt(
                advertisement.advertisement?.tintColor?.replace("#", ""),
                16
              ),
              Name: advertisement.advertisement.resourceName,
              InstitutionId: advertisement.advertisement.institution,
              MediaUrl: mediaURL,
              IntervalId: advertisement.advertisement.intervalId,
              CampaignId: advertisement.advertisement.campaigns,
              TintColor: parseInt(
                advertisement.advertisement?.tintColor?.replace("#", ""),
                16
              ),
            };

            console.log("POST advertisement payload ", advertise);
            apiHandler
              .post("advertisements", advertise)
              .then(
                (response) => {
                  if (advertisement.promotion !== "") {
                    let promo = "";
                    if (advertisement.promotion.weblink === "") {
                      promo = {
                        Title: advertisement.promotion.title,
                        Subtitle: advertisement.promotion.subtitle,
                        code: advertisement.promotion.code,
                        StartAt: advertisement.promotion.startDate,
                        EndAt: advertisement.promotion.endDate,
                        UsageLimit: advertisement.promotion.useageLimit,
                        IsSharable: advertisement.promotion.shareQR,
                        AdvertisementId: response.data.advertisementId,
                        InstitutionId: advertisement.advertisement.institution,
                        type: "coupons",
                      };
                    } else {
                      promo = {
                        Title: advertisement.promotion.title,
                        Subtitle: advertisement.promotion.subtitle,
                        code: advertisement.promotion.code,
                        links: {
                          Web: advertisement.promotion.weblink,
                          Ios: advertisement.promotion.iOSLink,
                          Android: advertisement.promotion.androidLink,
                        },
                        type: "links",
                        AdvertisementId: response.data.advertisementId,
                        InstitutionId: advertisement.advertisement.institution,
                      };
                    }
                    console.log("POST promotions payload ", promo);
                    apiHandler.post("promotions", promo).then((res) => {
                      console.log(res);
                      dispatch(savePromotions(response.data));
                    });
                  } else dispatch(savedAdvertisement());
                },
                (error) => {
                  dispatch(saveAdvertisementFailure(error));
                }
              )
              .catch((err) => console.log(err));
          } else {
            // Edit mode
            const advertise = {
              AdvertisementId: advertisement.advertisement.advertisementId,
              InvertedTintColor: advertisement.advertisement.tintColor,
              Name: advertisement.advertisement.resourceName,
              InstitutionId: advertisement.advertisement.institution,
              MediaUrl: mediaURL,
              IntervalId: advertisement.advertisement.intervalId,
              CampaignId: advertisement.advertisement.campaigns,
              TintColor: advertisement.advertisement.tintColor,
            };
            axios
              .put(
                `${apiDomain}advertisements`,
                { ...advertise },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .catch((err) => console.log(err));
          }
        });
  };
  function addAdvertisementRequest() {
    return { type: advertisementsConstants.saveAdvertisements_REQUEST };
  }
  function savedAdvertisement() {
    return { type: advertisementsConstants.saveAdvertisements_SUCCESS };
  }
  function savePromotions() {
    return { type: advertisementsConstants.savePromotions_SUCCESS };
  }
  function saveAdvertisementFailure(error) {
    alert(error.response.data.title);
    return {
      type: advertisementsConstants.saveAdvertisements_ERROR,
      payload: error,
    };
  }
}

export function savePromotions(promotion) {
  return (dispatch) => {
    dispatch(addPromotionsRequest());
    apiHandler.post("promotions", promotion).then(
      (response) => {
        dispatch(savePromotions(response.data));
      },
      (error) => {
        dispatch(savePromotionsError(error));
      }
    );
  };
  function addPromotionsRequest() {
    return { type: advertisementsConstants.savePromotions_REQUEST };
  }
  function savePromotions(promotion) {
    return {
      type: advertisementsConstants.savePromotions_SUCCESS,
      payload: promotion,
    };
  }
  function savePromotionsError(error) {
    return {
      type: advertisementsConstants.savePromotions_ERROR,
      payload: error,
    };
  }
}

export function saveCampaign(Campaign, action) {
  return (dispatch) => {
    dispatch(saveCampaignRequest());
    if (action === "save") {
      apiHandler.put("campaigns", Campaign).then(
        (response) => {
          dispatch(saveCampaignSuccess(response.data));
        },
        (error) => {
          dispatch(saveCampaignFailure(error));
        }
      );
    } else {
      apiHandler.post("campaigns", Campaign).then(
        (response) => {
          dispatch(saveCampaignSuccess(response.data));
        },
        (error) => {
          dispatch(saveCampaignFailure(error));
        }
      );
    }
  };

  function saveCampaignRequest() {
    return { type: advertisementsConstants.saveCampaigns_REQUEST };
  }
  function saveCampaignSuccess(campaign) {
    return {
      type: advertisementsConstants.saveCampaigns_SUCCESS,
      payload: campaign,
    };
  }
  function saveCampaignFailure(error) {
    return {
      type: advertisementsConstants.saveCampaigns_ERROR,
      payload: error,
    };
  }
}

export function deleteAdvertisement(id) {
  return (dispatch) => {
    dispatch(deleteAdvertisementRequest());
    apiHandler.delete("advertisements/" + id).then(
      (response) => {
        dispatch(deletedAdvertisement(response));
      },
      (error) => {
        dispatch(deleteAdvertisementFailure(error));
      }
    );
  };
  function deleteAdvertisementRequest() {
    return { type: advertisementsConstants.deleteAdvertisements_REQUEST };
  }
  function deletedAdvertisement(response) {
    return {
      type: advertisementsConstants.deleteAdvertisements_SUCCESS,
      payload: response,
    };
  }
  function deleteAdvertisementFailure(error) {
    return {
      type: advertisementsConstants.deleteAdvertisements_ERROR,
      payload: error,
    };
  }
}

export function deleteCampaign(id) {
  return (dispatch) => {
    dispatch(deleteCampaignRequest());
    apiHandler.delete("campaigns/" + id).then(
      (response) => {
        dispatch(deleteCampaignSuccess(response));
      },
      (error) => {
        dispatch(deleteCampaignFailure(error));
      }
    );
  };
  function deleteCampaignRequest() {
    return { type: advertisementsConstants.deleteCampaigns_REQUEST };
  }
  function deleteCampaignSuccess(response) {
    return {
      type: advertisementsConstants.deleteCampaigns_SUCCESS,
      payload: response,
    };
  }
  function deleteCampaignFailure(error) {
    return {
      type: advertisementsConstants.deleteCampaignFailure,
      payload: error,
    };
  }
}

function updateAdvertisementList() {
  return { type: advertisementsConstants.updateTheAdvertisementList };
}
