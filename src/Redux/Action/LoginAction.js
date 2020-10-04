import axios from "axios";
import { history } from "../../helper/history";
import { userConstants } from "../../constants/userConstants";
import jwt from "jsonwebtoken";
import { encryptAndEncode, encryptAES } from "../encrypt";
import setAuthorizationToken from "../../util/setAuthorizationToken";

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
  // return (dispatch) => {
  //   const tokenT =
  //     "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ2dGhhcmFrYUByb3V0ZXNtZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJzdXBlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIzIiwiZXhwIjoxNjE3MDIwMjcwLCJpc3MiOiJUcmFja1NlcnZpY2UiLCJhdWQiOiJUcmFja1NlcnZpY2UifQ.5DH6aw8zP-KpzUXa0kW0X1tpwqN3hffaBkSquAy9ENA";

  //   const token = jwt.decode(tokenT);
  //   const user = token.user;
  //   localStorage.setItem("user", user);
  //   var encryptedPasswordTotest = encryptAndEncode(password);
  //   dispatch(getLoginSuccess(user));
  //   history.push("/home");
  //   localStorage.setItem("jwtToken", tokenT);
  //   setAuthorizationToken(token);
  // };

  return dispatch => {
      dispatch(request({ username, password }));
      var encryptedpassword = encryptAES(password);
      let userObject = {
          Username: username,
          Password: encryptAndEncode(password)
      };

      axios.post(userConstants.Domain + 'signin', userObject)
          .then(
              response => {

                  console.log("User Details : ", JSON.stringify(user));
                  const tokenT = response.token;
                  const token = jwt.decode(response.token);
                  const user = response.data;
                  localStorage.setItem('user', user);
                  dispatch(getLoginSuccess(user));
                  history.push('/home');
                  localStorage.setItem('jwtToken', token);
                  setAuthorizationToken(token);
              },
              error => {
                  dispatch(getLoginFailure(error.message.toString()));
                  alert(error.toString());
                  //dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(user) {
    return { type: userConstants.Login_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.Login_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.Login_FAILURE, error };
  }
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
    // var encryptedpassword = encryptAES(institutionObject.Password);
    // var encryptedconfirmpassword = encryptAES(institutionObject.ConfirmPassword);
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
