import axios from 'axios';
import { history } from '../../helper/history';
import { userConstants } from '../../constants/userConstants';
import { encryptAES } from '../encrypt';
//import { useAlert } from "react-alert";


const userObjt = {};

//export const LoginAction = {
//    userSignInRequest,
//    logout,
//    getLoginSuccess,
//    getLoginFailure,
//    getUser
//};

 export const getLoginSuccess = payload => ({
    type: userConstants.Login_SUCCESS,
    payload
});

export const getLoginFailure = payload => ({
    type: userConstants.Login_FAILURE,
    payload
});


export const getUsers = user => ({
    type: 'GET_USER',
    payload: user
});

export function getUser() {
    userObjt = localStorage.getItem('user');
    console.log("User Logged In is : ", userObjt);
    return userObjt;
}

export function userSignInRequest(username, password) {

    return dispatch => {
        dispatch(request({ username, password }));
        var encryptedpassword = encryptAES(password);
        let UserObject = {
            email: username,
            password: encryptedpassword.toString()
        };

        axios.post('http://localhost:55205/api/Users/Login', UserObject)
            .then(
                user => {
                    dispatch(getLoginSuccess(user));
                    //console.log("User Details : ", JSON.stringify(user));
                    history.push('/Home');
                    localStorage.setItem('user', JSON.stringify(user));
                    //alert("Hi " + user.data.first_name);
                    //alert.show("Hi " + user.data.first_name);
                },
                error => {
                    dispatch(getLoginFailure(error.toString()));
                    alert(error.toString());
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.Login_REQUEST, user }; }
    function success(user) { return { type: userConstants.Login_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.Login_FAILURE, error }; }

}



export function forgotPassword(email) {

    return dispatch => {
        let PasswordObject = {
            Email: email
        };
        dispatch(requestForgotPassword(PasswordObject));
        

        axios.post('https://localhost:5001/api/Users/forgot_password', PasswordObject)
            .then(
                user => {
                    dispatch(ForgotPasswordsuccess(user));
                    //console.log("User Details : ", JSON.stringify(user));
                    alert("Hi " + user.data.first_name +" , Kindly check your mail for further instructions!!");
                },
                error => {
                    dispatch(ForgotPasswordfailure(error.toString()));
                    alert(error.toString());
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function requestForgotPassword(user) { return { type: userConstants.ForgotPassword_REQUEST, user }; }
    function ForgotPasswordsuccess(user) { return { type: userConstants.ForgotPassword_SUCCESS, user }; }
    function ForgotPasswordfailure(error) { return { type: userConstants.ForgotPassword_FAILURE, error }; }

}


export function ResetPassword(UserObject) {

    return dispatch => {

        var email = UserObject.Email;
        var encryptedpassword = encryptAES(UserObject.Password);
        var encryptedconfirmpassword = encryptAES(UserObject.ConfirmPassword);

        let ResetPasswordObject = {
            Email: email.toString(),
            Password: encryptedpassword.toString(),
            ConfirmPassword: encryptedconfirmpassword.toString()
        };

        dispatch(requestResetPassword(ResetPasswordObject));


        axios.post('https://localhost:5001/api/Users/rest_password', ResetPasswordObject)
            .then(
                user => {
                    dispatch(ForgotPasswordsuccess(user));
                    //console.log("User Details : ", JSON.stringify(user));
                    history.push('/Login');
                    localStorage.setItem('user', JSON.stringify(user));
                    alert("Hi " + user.data.first_name + ", Please note that your password is updated.");
                },
                error => {
                    dispatch(ResetPasswordfailure(error.toString()));
                    alert(error.toString());
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function requestResetPassword(user) { return { type: userConstants.ForgotPassword_REQUEST, user }; }
    function ForgotPasswordsuccess(user) { return { type: userConstants.ForgotPassword_SUCCESS, user }; }
    function ResetPasswordfailure(error) { return { type: userConstants.ForgotPassword_FAILURE, error }; }

}

export function UpdateNavSelection(navItem) {
    return dispatch => {
        dispatch(updateSelectedNavItem(navItem));
    }
}

function updateSelectedNavItem(navItem) {
    return { type: userConstants.NavItemSelected, payload: navItem };
}

export function logout() {
    //userService.logout();
    return { type: userConstants.Login_LOGOUT };
}


