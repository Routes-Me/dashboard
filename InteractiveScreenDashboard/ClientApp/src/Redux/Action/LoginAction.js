import axios from 'axios';
import { history } from '../../helper/history';
import { userConstants } from '../../constants/userConstants';
import { encryptAES } from '../encrypt';



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

        axios.post('https://localhost:5001/api/UserAccounts/Login', UserObject)
            .then(
                user => {
                    dispatch(getLoginSuccess(user));
                    //console.log("User Details : ", JSON.stringify(user));
                    history.push('/Home');
                    localStorage.setItem('user', JSON.stringify(user));
                    alert("Success : " + user.data.first_name + "is authenticated");
                    },
                error => {
                    dispatch(failure(error.toString()));
                    alert("Access denied");
                    //dispatch(alertActions.error(error.toString()));
                    }
            );
    };

    function request(user) { return { type: userConstants.Login_REQUEST, user }; }
    function success(user) { return { type: userConstants.Login_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.Login_FAILURE, error }; }

}

export function logout() {
    //userService.logout();
    return { type: userConstants.Login_LOGOUT };
}


