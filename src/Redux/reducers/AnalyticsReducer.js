import { analyticsConstant } from "../../constants/analyticsConstants";


const INITIAL_STATE = {
    Advertisements: [],
    Loading: false
}

const AnalyticsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case analyticsConstant.getAdvertisement_REQUEST:
            return {
                ...state,
                Loading: true
            };
        case analyticsConstant.getAdvertisement_SUCCESS:
            return {
                ...state,
                Loading: false,
                Advertisements: action.payload
            };
        case analyticsConstant.getAdvertisement_ERROR:
            return {
                ...state,
                Loading: false
            };
        default:
            return state;
    }
}

export default AnalyticsReducer;