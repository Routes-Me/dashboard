import { DriversConsts } from "../../constants/DriversConsts";


const INITIAL_STATE = {
    Drivers: {},
    hasError: null,
    Error: "",
    Loading: false,
    posthasSuccesed: false,
    searchErr: false
}

const DriversReducers = (state= INITIAL_STATE, action) => {

    switch (action.type) {
        case DriversConsts.getDrivers_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false,
                posthasSuccesed: false
            }

            
        case DriversConsts.GET_DRIVERS_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                Drivers: action.payload,
                posthasSuccesed: false
            }
        case DriversConsts.postDrivers_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false,
                posthasSuccesed: false,
            }
        case DriversConsts.postDrivers_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                posthasSuccesed: true,
            }
        case DriversConsts.DRIVER_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false,
            }
        case DriversConsts.DELETE_DRIVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                posthasSuccesed:true
            }
        case DriversConsts.DELETE_DRIVER_ERROR:
            return {
                ...state,
                Loading: false,
                hasError: true,
                posthasSuccesed:false
            }
        case DriversConsts.EDIT_DRIVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                posthasSuccesed:true
            }
        case DriversConsts.SEARCH_DRIVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false,
                searchErr:false,
                Drivers: action.payload
            }
        case DriversConsts.SEARCH_DRIVER_ERR:
            return {
                ...state,
                Loading: false,
                hasError: true,
                searchErr:true,
            }
        default:
            return state;
    }
}


export default DriversReducers;