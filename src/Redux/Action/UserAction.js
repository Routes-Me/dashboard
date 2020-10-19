import { MockServerData } from '../../constants/MockServerData';
import { userConstants } from '../../constants/userConstants';
import apiHandler from '../../util/request';



//Get UsersList
export function getUsers(institutionId, pageIndex) {

    return dispatch => {
        dispatch(UsersDataRequest());
        apiHandler.get(buildURL('users',1,true))
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



// get User Roles
export function getPriviledges() {
  return dispatch => {  
    apiHandler.get(buildURL('privileges',1,false))
        .then(
            priviledges => {
                    dispatch(storeUserRoles(priviledges.data.data));
                },
                error => {
                    alert(error.toString());
                }
            );
    //dispatch(storeUserRoles(MockServerData.Priviledges.data))
  }
  function storeUserRoles(roles) { return { type: userConstants.update_PRIVILEGES, payload: roles } };

}

// get applications
export function getApplications(){

  return dispatch => { 
    apiHandler.get(buildURL('applications',1,false))
        .then(
          applications =>{
                    dispatch(storeApplications(applications.data.data));
                },
                error =>{
                    alert(error.toString());
                }
        );
    //dispatch(storeApplications(MockServerData.Applications.data)) 
  }
  function storeApplications(apps){ return {type:userConstants.update_APPLICATIONS, payload:apps }};

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


// delete user
export function deleteUser(userId)
{
  return (dispatch)=>{
    dispatch(deleteUserRequest)
    if(userId!= null)
    {
      apiHandler.delete("users/"+userId)
      .then(
        (user) => {
          dispatch(deleteUserSuccess(user));
          getUsers();
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
    const userRolesList = response.include.userRoles;

    const FormatedUsers = usersList.map(x => ({
        id: x.userId,
        email: x.email,
        phone: x.phone,
        createdDate: x.createdDate,
        isVerified: x.isVerified,
        lastLoginDate: x.lastLoginDate,
        userRoles: filterUserRolesList(userRolesList,x.userRoles),
        name: x.name,
        description: x.description
    }))
    return FormatedUsers;

}


function filterUserRolesList(userRolesList, userRoles)
{
  let roles = "";
  if( userRoles !== undefined && userRolesList.length > 0)
  {
    roles = userRolesList.filter(y => y.include(userRoles));
  }
  else
  {
    roles =[0];
  }
  return roles
}


function buildURL(entity, offset, include) 
{
    let queryParameter =""
    if(include)
    {
      queryParameter=entity+"?offset="+offset+"&limit="+userConstants.Pagelimit+"&include=services";
    }
    else
    {
      queryParameter=entity+"?offset="+offset+"&limit="+userConstants.Pagelimit;
    }
    return queryParameter;
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
        roles:x.roles
      //services: servicesList.filter((y) => y.include(x.services))
    }));
  
    return formatedUsers;
}




//Save User Detail
export function saveUser(user,action) {

    return dispatch => {
        dispatch(saveUserDataRequest);
        if (action === "add") {
          apiHandler.post('signup', user)
              .then(
                users => {
                    dispatch(saveUserDataSuccess);
                },
                error => {
                    alert(error.message.toString() );
                });
        }
        else {
          apiHandler.put('users' , user)
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





