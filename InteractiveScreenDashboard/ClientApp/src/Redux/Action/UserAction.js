import { MockServerData } from '../../constants/MockServerData';
import { userConstants } from '../../constants/userConstants';


//Get UsersList
export function getUsers(id) {

    return dispatch => {

        dispatch(UsersDataRequest());
        const Users = MockAPICallForUsers();
        dispatch(storeUserRoles(Users.include.userRoles));
        dispatch(storeApplications(Users.include.applications));
        dispatch(UsersDataReceived(Users.data.users));

    }

}

//Update on API
function MockAPICallForUsers() {
    const response = MockServerData.UsersMockServerData;
    //const UsersList = res.data.users;
    return response;
}

function storeUserRoles(roles) {
    return { type: userConstants.update_USERROLES, payload: roles }
} 

function storeApplications(applist) {
    return { type: userConstants.update_APPLICATIONS, payload: applist }
}

function UsersDataRequest() {
    return { type: userConstants.getUsers_REQUEST }
}

function UsersDataReceived(Users) {
    return { type: userConstants.getUsers_SUCCESS, payload: Users }
}


// get User Roles
export function getUserRoles() {

    return dispatch => {

        dispatch(userRolesRequest());
        const userRoles = mockAPICallForUserRoles();
        dispatch(userRolesReceived(userRoles));

    }

}

//Update with API
function mockAPICallForUserRoles() {
    return MockServerData.UserRolesDetails.data.userRoles;
}

function userRolesRequest() {
    return { type: userConstants.getUserRoles_REQUEST };
}

function userRolesReceived(roles) {
    return { type: userConstants.update_USERROLES, payload: roles };
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
            MockAPICallForPutUser(user);
        }
        else {
            //Update on API
            MockAPICallForPostUser(user);
        }
        dispatch(saveUserDataSuccess);
    }
}


//Update on API
function MockAPICallForPutUser(user) {
    console.log("Dictionary for the create PUT/user API", user);
}

//Update on API
function MockAPICallForPostUser(user) {
    console.log("Dictionary for the create POST/user API", user);
}


function saveUserDataRequest() {
    return { type: userConstants.saveUsers_REQUEST };
}

function saveUserDataSuccess() {
    return { type: userConstants.saveUsers_SUCCESS };
}