import { MockServerData } from '../../constants/MockServerData';
import { userConstants } from '../../constants/userConstants';
import axios from 'axios';
import { stripBasename } from 'history/PathUtils';


const Token = localStorage.getItem("jwtToken").toString();


//Get UsersList
export function getUsers(institutionId, pageIndex) {

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
        //dispatch(UsersDataRequest());
        //const Users = MockAPICallForUsers();
        //dispatch(storeUserRoles(Users.include.userRoles));
        //dispatch(storeApplications(Users.include.applications));
        //dispatch(UsersDataReceived(Users.data.users));

    }

}

function UsersDataRequest() { return { type: userConstants.getUsers_REQUEST } }
function storeUsersData(Users) { return { type: userConstants.getUsers_SUCCESS, payload: Users } }
function updatePage(pages) { return { type: userConstants.UpdatePage, payload: pages } }

//id in the response would be replaced by object in this function
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

//Update on API
function MockAPICallForUsers() {
    const response = MockServerData.UsersMockServerData;
    //const UsersList = res.data.users;
    return response;
}


// get User Roles
export function getPriviledges() {

    return dispatch => {

        dispatch(storeUserRoles(MockServerData.Priviledges.data));

    }

    function storeUserRoles(roles) { return { type: userConstants.update_USERROLES, payload: roles } };

}

// get applications
export function getApplications(){

    return dispatch => {

        dispatch(storeApplications(MockServerData.Applications.data))

    }
    
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
export function saveUser(user) {
    return dispatch => {
        dispatch(saveUserDataRequest);
        if (user.userId !== "" || user.userId !== undefined) {
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
            axios.put(userConstants.Domain + 'users?' + user,{
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

//Update on API
function MockAPICallForPutUser(user) {
    console.log("Dictionary for the create PUT/user API", user);
}

//Update on API
function MockAPICallForPostUser(user) {
    console.log("Dictionary for the create POST/user API", user);
}



