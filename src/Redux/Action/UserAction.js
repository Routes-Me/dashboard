﻿import { MockServerData } from '../../constants/MockServerData';
import { userConstants } from '../../constants/userConstants';
import axios from 'axios';




//Get UsersList
export function getUsers(institutionId, pageIndex) {

    const Token = localStorage.getItem("jwtToken");

    return dispatch => {
        dispatch(UsersDataRequest());
        axios.get(userConstants.Domain + 'users?offset=1&limit=10', {
            headers: { Authorization: "Bearer " + Token },
            "Content-Type": "application/json; charset=utf-8",
        })
        .then(
                users => {
                    dispatch(storeUsersData(returnFormatedResponseForUsers(users)));
                    dispatch(updatePage(users.data.pagination));
                },

                error => {
                    alert(error.toString());
                }
            );
    }

}

function UsersDataRequest() { return { type: userConstants.getUsers_REQUEST } }

function storeUsersData(Users) { return { type: userConstants.getUsers_SUCCESS, payload: Users } }

function updatePage(pages) { return { type: userConstants.UpdatePage, payload: pages } }


// delete user
export function deleteUser(userId)
{
  const Token = localStorage.getItem("jwtToken").toString();
  return (dispatch)=>{
    dispatch(deleteUserRequest)
    if(userId!= null)
    {
      axios.delete(userConstants.Domain + "users/"+userId,{
        headers: { Authorization: "Bearer " + Token },
        "Content-Type": "application/json; charset=utf-8",
      })
      .then(
        (user) => {
          dispatch(deleteUserSuccess(user));
        },
        (error) => {
          alert(error.toString());
        }
      );
    }
  }
}

function deleteUserRequest() { return {type: userConstants.deleteUser_Request} }

function deleteUserSuccess(user){ return {type: userConstants.deleteUser_Success, payload: user} }

function deleteUserError(message) { return {type: userConstants.deleteUser_Error, payload: message} }





function returnFormatedUsers(response) {
    const usersList = response.data.users.filter(user => user.institutionId === 3)
    //console.log('Vehicle Action Array returned :', VehicleList);
    const userRolesList = response.include.userRoles;

    const FormatedUsers = usersList.map(x => ({
        id: x.userId,
        email: x.email,
        phone: x.phone,
        createdDate: x.createdDate,
        isVerified: x.isVerified,
        lastLoginDate: x.lastLoginDate,
        userRoles: userRolesList.filter(y => y.include(x.userRoles)),
        name: x.name,
        description: x.description
    }))

    return FormatedUsers;
}

function returnQueryParamters(offset, include) {

    let queryParameter;
    if (include) {
        queryParameter = {
            "offset": offset,
            "limit": userConstants.limit,
            "include": ["roles"]
        }
    }
    else {
        queryParameter = {
            "offset": offset,
            "limit": userConstants.limit
        }
    }
    return queryParameter;

}

function returnFormatedResponseForUsers(response) {
    const usersList = response.data.data;
    // const servicesList = response.data.included.services;
  
        const formatedUsers = usersList.map((x) => ({
        userId: x.userId,
        name: x.name,
        email: x.email,
        phone: x.phone,
        createdAt: x.createdAt,
        application:x.application
      //services: servicesList.filter((y) => y.include(x.services))
    }));
  
    return formatedUsers;
}


// get User Roles
export function getPriviledges() {

    return dispatch => {  dispatch(storeUserRoles(MockServerData.Priviledges.data)) }
    function storeUserRoles(roles) { return { type: userConstants.update_USERROLES, payload: roles } };

}

// get applications
export function getApplications(){

    return dispatch => { dispatch(storeApplications(MockServerData.Applications.data)) }
    function storeApplications(apps){ return {type:userConstants.update_APPLICATIONS, payload:apps}};

}

//Autherize the logged in user with the userRole
export function getAutherization(roleId) {
    
    let navList = MockServerData.NavMenuItems.data;
    let navObj = navList.filter(x=>x.roleId===roleId);
        

    return dispatch => {
        dispatch(storeNavItems(navObj[0].navItems));
    }

    function storeNavItems(navItems) { return { type: userConstants.getNavItems_SUCCESS, payload: navItems } } ;

}


//Save User Detail
export function saveUser(user,action) {
    const Token = localStorage.getItem("jwtToken").toString();
    return dispatch => {
        dispatch(saveUserDataRequest);
        if (action === "add") {
            axios.post(userConstants.Domain + 'signup' , user, {
                headers: { Authorization: "Bearer " + Token },
                "Content-Type": "application/json; charset=utf-8",
              })
              .then(
                users => {
                    dispatch(saveUserDataSuccess);
                },
                error => {
                    alert(error.message.toString() );
                });
        }
        else {
            axios.put(userConstants.Domain + 'users' , user,{
                headers: { Authorization: "Bearer " + Token },
                "Content-Type": "application/json; charset=utf-8",
              })
              .then(
                users => {
                    dispatch(saveUserDataSuccess);
                },
                error => {
                    alert(error.toString());
                });
        }
        
    }
}
function saveUserDataRequest() { return { type: userConstants.saveUsers_REQUEST } }
function saveUserDataSuccess() { return { type: userConstants.saveUsers_SUCCESS } }





