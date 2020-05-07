import axios from 'axios'
export const Login_REQUEST = 'LOGIN_REQUEST';
export const Login_SUCCESS = 'LOGIN_SUCCESS';
export const Login_ERROR = 'LOGIN_ERROR';
export const Login_Failed = 'LOGIN_FAILED';

const getLoginSuccess = payload => ({
    type: Login_SUCCESS,
    payload
});

const getTripsError = payload => ({
    type: Login_ERROR,
    payload
});

export const getAllTrips = () => dispatch => {
    dispatch({ type: Login_REQUEST });
    return axios.get('api/Trips/GetTrips').then(res => {
        const response = res.data;
        dispatch(getLoginSuccess(response));
    }).catch(error => {
        dispatch(getTripsError("Something went wrong!"));
        return Promise.reject({});
    })
}