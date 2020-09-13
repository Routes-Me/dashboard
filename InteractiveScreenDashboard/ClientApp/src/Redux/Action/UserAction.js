import { MockServerData } from '../../constants/MockServerData';
import { userConstants } from '../../constants/userConstants';
import axios from 'axios';
import { stripBasename } from 'history/PathUtils';

//Get UsersList
export function getUsers(institutionId, pageIndex) {

    return dispatch => {

        dispatch(UsersDataRequest());
        axios.get(userConstants.Domain + 'api/users?' + institutionId, {
            params: { queryParameter: returnQueryParamters(pageIndex, true) }
        }).then(
                users => {
                    dispatch(storeUsersData(returnFormatedUsers(users)));
                dispatch(updatePage(users.pagination));
                },
                error => {
                   // alert(error.toString());
                });
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

//Update on API
function MockAPICallForUsers() {
    const response = MockServerData.UsersMockServerData;
    //const UsersList = res.data.users;
    return response;
}



function storeApplications(applist) {
    return { type: userConstants.update_APPLICATIONS, payload: applist }
}




// get User Roles
export function getUserRoles(pageIndex) {

    return dispatch => {

        dispatch(userRolesRequest());
        axios.get(userConstants.Domain + 'api/users/roles', {
            params: { queryParameter: returnQueryParamters(pageIndex, true) }
        }).then(
            role => {
                dispatch(storeUserRoles(role.data.userRoles));
                //dispatch(updatePage(vehicles.pagination));
            },
            error => {
                //alert(error.toString());
            });

        //const userRoles = mockAPICallForUserRoles();
        //dispatch(storeUserRoles(userRoles));

    }

}
function userRolesRequest() { return { type: userConstants.getUserRoles_REQUEST } }
function storeUserRoles(roles) { return { type: userConstants.update_USERROLES, payload: roles } }

//Autherize the logged in user with the userRole
export function getAutherization(roleId) {

    return dispatch => {
        dispatch(navItemRequest);
        var url = userConstants.Domain + 'users/autherization/'
        axios.get(url + roleId).then(
            navObj => { dispatch(storeNavItems(navObj.data.navItems)) },
            error => { alert(error.toString()) }
        );
    }
}
function navItemRequest() { return { type: userConstants.getNavItems_REQUEST } };
function storeNavItems(navItems) {
    return { type: userConstants.getNavItems_SUCCESS, payload: navItems }
} 


//Update with API
function mockAPICallForUserRoles() {
    return MockServerData.UserRolesDetails.data.userRoles;
}



//get aoolications list 
export function getApplications() {
    return dispatch => {
        dispatch(applicationsRequest())
        const applicationsList = mockAPICallforApplications()
        dispatch(applicationsReceived(applicationsList))
    }
}

//Update with API
function mockAPICallforApplications() {
    return MockServerData.ApplicationsDetail.data.applications;
}

function applicationsRequest() {
    return { type: userConstants.getApplications_REQUEST };
}

function applicationsReceived(apps) {
    return { type: userConstants.update_APPLICATIONS, payload: apps };
}


//Save User Detail
export function saveUser(user) {
    return dispatch => {
        dispatch(saveUserDataRequest);
        if (user.UserId !== "") {
            //Update on API
            axios.post(userConstants.Domain + 'api/users?' + user).then(
                users => {
                    dispatch(saveUserDataSuccess);
                },
                error => {
                    //alert(error.toString());
                });
        }
        else {
            //Update on API
            axios.put(userConstants.Domain + 'api/users?' + user).then(
                users => {
                    dispatch(saveUserDataSuccess);
                },
                error => {
                    //alert(error.toString());
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



