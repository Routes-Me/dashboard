import axios from "axios";
import { history } from "../../helper/history";
import { config } from "../../constants/config";
import { userConstants } from '../../constants/userConstants';
import jwt, { decode } from "jsonwebtoken";
import { encryptAndEncode, parseJwt } from "../../util/encrypt";
import { setToken as setToken, setRefreshToken, clearStorage, setUser, setRole as setRole } from '../../util/localStorage';
import apiHandler from '../../util/request';
import { convertObjectKeyToLowerCase } from "../../util/basic";


export function userSignInRequestV1(username, password) {

  console.log("Login :: Environment :", process.env.NODE_ENV);
  console.log('Login :: API Domain :', process.env.REACT_APP_APIDOMAIN);

  return dispatch => {
    dispatch(request({ username, password }));
    let userObject = {
      Username: username,
      Password: encryptAndEncode(password)
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'application': 'dashboard' },
      body: JSON.stringify(userObject)
    };

    // apiHandler.post('authentications', userObject)

    // fetch('https://stage.api.routesme.com/v1.0/authentications',requestOptions)
    // .then((responseObj) => {
    //   console.log('cookie ',responseObj);
    //   return responseObj.json();
    // })

    apiHandler.post('authentications', userObject)
      .then((response) => {
        //console.log('response ', response.headers);
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        setToken(token);
        setRefreshToken(refreshToken);
        dispatch(onReceiveToken(token));
        const tokenPayLoad = parseJwt(token);
        const roles = JSON.parse(atob(tokenPayLoad.rol));
        const role = convertObjectKeyToLowerCase(roles[0]);
        dispatch(authorize(role));
        console.log('Role ', role);
        setRole(role);
        const officerId = JSON.parse(atob(tokenPayLoad.ext)).OfficerId;
        apiHandler.get(`officers/${officerId}?include=users,institutions`)
          .then(
            (user) => {
              const userDetail = returnFormattedUser(user, officerId);
              console.log('userDetail logged in ', userDetail);
              setUser(userDetail);
              dispatch(getLoginSuccess(userDetail));
              history.push('/home');
            },
            (error) => {
              alert(`Officer not found!!`);
            }
          )
      },
        (error) => { alert(`Invalid User... Please check your credentials!!`); dispatch(failure(error.message.toString())); }
      )

  };
}

const returnFormattedUser = (response, officerId) => {
  const user = {
    userInfo: convertObjectKeyToLowerCase(response.data.included.users[0]),
    institution: convertObjectKeyToLowerCase(response.data.included.institutions[0]),
    officerId: officerId
  }
  console.log('return formatted user ', user);
  return user;
}

const signIn = (user) => {
  apiHandler.post('authentications', user)
    .then(
      (response) => response,
      (error) => error
    )
}

const getOfficer = (id) => {
  apiHandler.get('officers', id)
    .then(
      (officer) => { return officer },
      (error) => { return error }
    )
}

const login = (user) => {
  userSignInRequestV1(user).then()
}




function request(user) { return { type: userConstants.Login_REQUEST, user }; }
function onReceiveToken(token) { return { type: userConstants.Login_TokenReceived, payload: token } }
function getLoginSuccess(user) { return { type: userConstants.Login_SUCCESS, payload: user } }
function failure(error) { return { type: userConstants.Login_FAILURE, payload: error }; }
function authorize(rol) { return { type: userConstants.Login_Authorize, payload: rol }; }


export function restoreUserFromSession(user) {
  return dispatch => {
    dispatch(getLoginSuccess(user));
  }
}

export function restoreRoleFromSession(role) {
  return dispatch => {
    dispatch(authorize(role));
  }
}

export function restoreTokenFromSession(token) {
  return dispatch => {
    dispatch(onReceiveToken(token));
  }
}



//Autherize the logged in user with the userRole
export function getAutherization(roleId) {

  let navList = config.NavMenuItems.data;
  let navObj = navList.filter(x => x.roleId === roleId);

  return dispatch => {
    dispatch(storeNavItems(navObj[0].navItems));
  }

  function storeNavItems(navItems) { return { type: userConstants.getNavItems_SUCCESS, payload: navItems } };

}

export function forgotPassword(email) {
  return (dispatch) => {
    let PasswordObject = {
      Email: email,
    };
    dispatch(requestForgotPassword(PasswordObject));

    axios
      .post(process.env.REACT_APP_APIDOMAIN + "Users/forgot_password", PasswordObject)
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
        process.env.REACT_APP_APIDOMAIN + "Users/rest_password",
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
