import { DriversConsts } from "../../constants/DriversConsts";
import axios from "apiHandler"
import apiHandler from '../../util/request';
// import apiHandler from "../../util/request";
const localEnpoint = "https://localhost:44374/v1.0/drivers"

export function PostDriver (driver) {
    return (dispatch) => {
        dispatch({type: DriversConsts.DRIVER_REQUEST})

        apiHandler.post("drivers",driver)
        .then(res => {
            if(res.status === 200) {
                dispatch(postSuccess(res.data))
            }
        })
        .catch(err => dispatch({type: DriversConsts.DELETE_DRIVER_ERROR}))
    }
}

function postSuccess(value) {
    return {type: DriversConsts.postDrivers_SUCCESS}
}


// Get drivers
export function getDrivers(offset,limit) {
    return (dispatch) => {
        dispatch({type: DriversConsts.getDrivers_REQUEST})

        apiHandler.get(`drivers?offset=${offset}&limit=${limit}`)
        .then(res => {
            dispatch(getSuccess(res.data))
        })
        .catch(err => console.log(err));
    }
}

function getSuccess(payload) {
    return {type: DriversConsts.GET_DRIVERS_SUCCESS, payload:payload}
}

// Delete driver
export function deleteDriver(id) {
    return (dispatch) => {
        dispatch({type: DriversConsts.DRIVER_REQUEST})

        apiHandler.delete(`drivers/${id}`)
        .then(res => dispatch({type: DriversConsts.DELETE_DRIVER_SUCCESS}))
        .catch(err => dispatch({type: DriversConsts.DELETE_DRIVER_ERROR}))
    }
}

// eDIT DRIVER
export function editdriver(driver) {
    return (dispatch) => {
        dispatch({type: DriversConsts.DRIVER_REQUEST})

        apiHandler.put("drivers", driver)
        .then(res => dispatch({type: DriversConsts.EDIT_DRIVER_SUCCESS}))
        .catch(err => dispatch({type: DriversConsts.DELETE_DRIVER_ERROR}))
    }
}

// Search driver
export function searchDriver(searchTerm) {
    return (dispatch) => {
        dispatch({type: DriversConsts.DRIVER_REQUEST})

        apiHandler.get(`drivers/search/${searchTerm}`)
        .then(res => {
            dispatch(searchDriverSuccess(res.data))
        })
        .catch(err => dispatch({type: DriversConsts.SEARCH_DRIVER_ERR}))
    }
}

function searchDriverSuccess(res) {
    return {type: DriversConsts.SEARCH_DRIVER_SUCCESS, payload: res}
}