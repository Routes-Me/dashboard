import axios from 'axios'
export const Login_REQUEST = 'LOGIN_REQUEST';
export const Login_SUCCESS = 'LOGIN_SUCCESS';
export const Login_LOGOUT = 'LOGIN_LOGOUT';
export const Login_Failure = 'LOGIN_FAILURE';

const getLoginSuccess = payload => ({
    type: Login_SUCCESS,
    payload
});

const getLoginFailure = payload => ({
    type: Login_Failure,
    payload
});

export const authenticate = () => dispatch => {
    dispatch({ type: Login_REQUEST });
    return axios.get('api/Trips/GetTrips').then(res => {
        const response = res.data;
        dispatch(getLoginSuccess(response));
    }).catch(error => {
        dispatch(getLoginFailure("Something went wrong!"));
        return Promise.reject({});
    })
}