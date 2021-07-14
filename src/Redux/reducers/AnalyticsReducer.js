import { analyticsConstant } from "../../constants/analyticsConstants";


const INITIAL_STATE = {
    Advertisements: [],
    Loading: false,
    ActionState: ''
}

const AnalyticsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case analyticsConstant.getAdvertisement_REQUEST:
            return {
                ...state,
                Loading: true,
                Advertisements: [],
                ActionState: action.type
            };
        case analyticsConstant.getAdvertisement_SUCCESS:
            return {
                ...state,
                Loading: false,
                Advertisements: action.payload,
                ActionState: action.type
            };
        case analyticsConstant.getAdvertisement_ERROR:
            return {
                ...state,
                Loading: false,
                Advertisements: [],
                ActionState: action.type
            };
        default:
            return state;
    }
}

export default AnalyticsReducer;