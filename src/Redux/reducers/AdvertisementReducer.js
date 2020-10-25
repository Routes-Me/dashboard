import { advertisementsConstants } from '../../constants/advertisementConstants';

const INITIAL_STATE = {
    Advertisements: [],
    Campaigns: [],
    DayIntervals:[],
    Page: "",
    loading: true,
    hasError: false,
    error: null,
    Title: "",
    SubTitle:"",
    Media: ""
}

const AdvertisementReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case advertisementsConstants.getAdvertisements_REQUEST:
            return {
                ...state,
                loading: true,
                hasError: false
            };
        case advertisementsConstants.getAdvertisements_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                Advertisements: action.payload
            };
        case advertisementsConstants.getAdvertisements_ERROR:
            return {
                ...state,
                loading: false,
                hasError: true,
                error: action.payload
            };
        case advertisementsConstants.getCampaigns_REQUEST:
            return {
                ...state,
                loading: true,
                hasError: false
            };
        case advertisementsConstants.getCampaigns_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                Campaigns: action.payload
            };
        case advertisementsConstants.getDayIntervals_REQUEST:
            return {
                ...state,
                loading: true,
                hasError: false
            };
        case advertisementsConstants.getDayIntervals_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                DayIntervals: action.payload
            };
        case advertisementsConstants.saveAdvertisements_REQUEST:
            return {
                ...state,
                loading: true,
                hasError: false
            };
        case advertisementsConstants.saveAdvertisements_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false
            };
        case advertisementsConstants.saveAdvertisements_ERROR:
            return {
                ...state,
                loading: false,
                hasError: true,
                error: action.payload
            };
        case advertisementsConstants.uploadMedia_REQUEST:
            return {
                ...state,
                loading: true,
                hasError: false
            };
        case advertisementsConstants.uploadMedia_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                Media: action.payload
            };
        case advertisementsConstants.uploadMedia_ERROR:
            return {
                ...state,
                loading: false,
                hasError: true,
                error: action.payload
            };
        case advertisementsConstants.onPromotions_TitleChange:
            return {
                ...state,
                loading: false,
                hasError: false,
                Title: action.payload
            };
        case advertisementsConstants.onPromotions_SubTitleChange:
            return {
                ...state,
                loading: false,
                hasError: false,
                SubTitle: action.payload
            };
        default:
            return state;
    }

}

export default AdvertisementReducer;
