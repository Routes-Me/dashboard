import { advertisementConstant, advertisementsConstants } from '../../constants/advertisementConstants';

const INITIAL_STATE = {
    Advertisement: [],
    Campsigns: [],
    Page: "",
    loading: true,
    hasError: false,
    error: null
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
                Advertisement: action.payload
            };
        case advertisementsConstants.getAdvertisements_ERROR:
            return {
                ...state,
                loading: false,
                hasError: true,
                error: action.payload
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
    }

}

export default AdvertisementReducer;
