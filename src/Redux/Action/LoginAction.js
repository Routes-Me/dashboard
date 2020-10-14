import axios from "axios";
import { history } from "../../helper/history";
import { userConstants } from "../../constants/userConstants";
import jwt from "jsonwebtoken";
import { encryptAndEncode } from "../encrypt";
import {setAuthorizationToken} from '../../util/request'

const userObj = {};

export const getLoginSuccess = (payload) => ({
  type: userConstants.Login_SUCCESS,
  payload,
});

export const getLoginFailure = (payload) => ({
  type: userConstants.Login_FAILURE,
  payload,
});

export function getUser() {
  userObj = localStorage.getItem("user");
  console.log("User Logged In is : ", userObj);
  return userObj;
}

export function userSignInRequest(username, password) {
  localStorage.clear();
  return dispatch => {
      dispatch(request({ username, password }));
      let userObject = {
          Username: username,
          Password: encryptAndEncode(password)
      };

      axios.post(userConstants.Domain + 'signin', userObject)
          .then(
              response => {
                  const token = response.data.token;
                  const LoggedInUser = jwt.decode(token);
                  const user = response.data;
                  localStorage.setItem('user', LoggedInUser);
                  dispatch(getLoginSuccess(LoggedInUser));
                  localStorage.setItem('jwtToken', token);
                  dispatch(onReceiveToken(token));
                  setAuthorizationToken(token)
                  history.push('/home');
              },
              error => {
                  dispatch(getLoginFailure(error.message.toString()));
                  console.log('error message', error.toString());
                  alert(error.toString());
                  //dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(user) { return { type: userConstants.Login_REQUEST, user }; }
  function onReceiveToken(token) { return  {type: userConstants.Login_TokenReceived, payload: token} }
  function success(user) { return { type: userConstants.Login_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.Login_FAILURE, error }; }

}

export function forgotPassword(email) {
  return (dispatch) => {
    let PasswordObject = {
      Email: email,
    };
    dispatch(requestForgotPassword(PasswordObject));

    axios
      .post(userConstants.Domain + "api/Users/forgot_password", PasswordObject)
      .then(
        (user) => {
          dispatch(ForgotPasswordsuccess(user));
          //console.log("User Details : ", JSON.stringify(user));
          alert(
            "Hi " +
              user.data.first_name +
              " , Kindly check your mail for further instructions!!"
          );
        },
        (error) => {
          dispatch(ForgotPasswordfailure(error.toString()));
          //alert(error.toString());
          //dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function requestForgotPassword(user) {
    return { type: userConstants.ForgotPassword_REQUEST, user };
  }
  function ForgotPasswordsuccess(user) {
    return { type: userConstants.ForgotPassword_SUCCESS, user };
  }
  function ForgotPasswordfailure(error) {
    return { type: userConstants.ForgotPassword_FAILURE, error };
  }
}

export function ResetPassword(institutionObject) {
  return (dispatch) => {
    var email = institutionObject.Email;
    var encryptedpassword = encryptAndEncode(institutionObject.password);
    var encryptedconfirmpassword = encryptAndEncode(
      institutionObject.ConfirmPassword
    );

    let ResetPasswordObject = {
      Email: email.toString(),
      Password: encryptedpassword.toString(),
      ConfirmPassword: encryptedconfirmpassword.toString(),
    };

    dispatch(requestResetPassword(ResetPasswordObject));

    axios
      .post(
        userConstants.Domain + "api/Users/rest_password",
        ResetPasswordObject
      )
      .then(
        (user) => {
          dispatch(ForgotPasswordsuccess(user));
          //console.log("User Details : ", JSON.stringify(user));
          history.push("/Login");
          localStorage.setItem("user", JSON.stringify(user));
          alert(
            "Hi " +
              user.data.first_name +
              ", Please note that your password is updated."
          );
        },
        (error) => {
          dispatch(ResetPasswordfailure(error.toString()));
          //alert(error.toString());
          //dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function requestResetPassword(user) {
    return { type: userConstants.ForgotPassword_REQUEST, user };
  }
  function ForgotPasswordsuccess(user) {
    return { type: userConstants.ForgotPassword_SUCCESS, user };
  }
  function ResetPasswordfailure(error) {
    return { type: userConstants.ForgotPassword_FAILURE, error };
  }
}

export function UpdateNavSelection(navItem) {
  return (dispatch) => {
    dispatch(updateSelectedNavItem(navItem));
  };
}

function updateSelectedNavItem(navItem) {
  return { type: userConstants.NavItemSelected, payload: navItem };
}

export function logout() {
  //userService.logout();
  return (dispatch) => {
    dispatch(logOutRequest());
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(loggedOut());
  };
}

function logOutRequest() {
  return { type: userConstants.LogOut_REQUEST };
}

function loggedOut() {
  return { type: userConstants.LogOut_SUCCESS };
}
