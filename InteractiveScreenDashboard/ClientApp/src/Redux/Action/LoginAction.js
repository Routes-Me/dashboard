import axios from 'axios';
import { history } from '../../helper/history';

export const Login_REQUEST = 'LOGIN_REQUEST';
export const Login_SUCCESS = 'LOGIN_SUCCESS';
export const Login_LOGOUT = 'LOGIN_LOGOUT';
export const Login_FAILURE = 'LOGIN_FAILURE';




//export const LoginAction = {
//    userSignInRequest,
//    logout,
//    getLoginSuccess,
//    getLoginFailure,
//    getUser
//};

export const getLoginSuccess = payload => ({
    type: Login_SUCCESS,
    payload
});

export const getLoginFailure = payload => ({
    type: Login_FAILURE,
    payload
});


export const getUser = user => ({
    type: 'GET_USER',
    payload: user
});
export function userSignInRequest(username, password) {

    return dispatch => {
        dispatch(request({ username }));

        let UserObject = {
            userName: username,
            password: password
        };

        axios.post('https://localhost:5001/api/UserAccounts/Login', UserObject)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/Home');
                    alert("Success" + user + "is authenticated");
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert("Access denied");
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: Login_REQUEST, user }; }
    function success(user) { return { type: Login_SUCCESS, user }; }
    function failure(error) { return { type: Login_FAILURE, error }; }

}

export function logout() {
    //userService.logout();
    return { type: Login_LOGOUT };
}


