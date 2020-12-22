import axios from "axios";
import { history } from "../../helper/history";
import { config } from "../../constants/config";
import {userConstants} from '../../constants/userConstants';
import jwt from "jsonwebtoken";
import { encryptAndEncode, parseJwt } from "../../util/encrypt";
import {setToken, asyncSessionStorage, clearStorage} from '../../util/localStorage';


export function userSignInRequest(username, password) {
  
  return dispatch => {
      dispatch(request({ username, password }));
      let userObject = {
          Username: username,
          Password: encryptAndEncode(password)
      };

      axios.post(config.Domain + 'signin', userObject)
          .then(
              response => {
                  const token = response.data.token;
                  const testDecode = parseJwt(token)
                  const LoggedInUser = jwt.decode(token);
                  dispatch(getLoginSuccess(LoggedInUser));
                  setToken(token);
                  dispatch(onReceiveToken(token));
                  getAutherization(2);
                  history.push('/home');
              },
              error => {
                  dispatch(failure(error.message.toString()));
                  console.log('error message', error.message.toString());
                  alert(error.toString());
              }
          );
  };

}

function request(user) { return { type: userConstants.Login_REQUEST, user }; }
function onReceiveToken(token) { return  {type: userConstants.Login_TokenReceived, payload: token} }
function getLoginSuccess(payload) { return ({ type: userConstants.Login_SUCCESS, payload }); }
function failure(error) { return { type: userConstants.Login_FAILURE, error }; }


export function restoreUserFromSession(user){
  return dispatch => {
    dispatch(getLoginSuccess(user));
  }
}

export function restoreTokenFromSession(token){
  return dispatch => {
    dispatch(onReceiveToken(token));
  }
}



//Autherize the logged in user with the userRole
export function getAutherization(roleId) {

  let navList = config.NavMenuItems.data;
  let navObj = navList.filter(x=>x.roleId===roleId);

  return dispatch => {
      dispatch(storeNavItems(navObj[0].navItems));
  }

  function storeNavItems(navItems) { return { type: userConstants.getNavItems_SUCCESS, payload: navItems } } ;

}

export function forgotPassword(email) {
  return (dispatch) => {
    let PasswordObject = {
      Email: email,
    };
    dispatch(requestForgotPassword(PasswordObject));

    axios
      .post(config.Domain + "api/Users/forgot_password", PasswordObject)
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
        config.Domain + "api/Users/rest_password",
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
    clearStorage();
    dispatch(loggedOut());
  };
}

function logOutRequest() {
  return { type: userConstants.LogOut_REQUEST };
}

function loggedOut() {
  return { type: userConstants.LogOut_SUCCESS };
}
