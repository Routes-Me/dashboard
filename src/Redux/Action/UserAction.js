import { userConstants } from '../../constants/userConstants';
import apiHandler from '../../util/request';
import { validate, returnEntityForInstitution } from '../../util/basic';



//Get UsersList
export function getUsers(pageIndex,limit,institutionId) {

    return dispatch => {
        dispatch(UsersDataRequest());
        apiHandler.get(buildURL('users',pageIndex,limit,true,institutionId))
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
export function getPrivileges(pageIndex,limit) {
  return dispatch => { 
    getRequest('privileges') 
    apiHandler.get(buildURL('privileges',pageIndex,limit,false))
        .then(
            priviledges => {
                    dispatch(getSuccess('privileges',(returnFormatedRoles('privileges',priviledges.data.data))));
                },
                error => {
                    alert(error.toString());
                }
            );
  }

}

// get applications
export function getApplications(pageIndex,limit){

  return dispatch => {
    getRequest('applications');
    apiHandler.get(buildURL('applications',pageIndex,limit,false))
        .then(
          applications =>{
                    dispatch(getSuccess('applications',(returnFormatedRoles('applications',applications.data.data))));
                },
                error =>{
                    alert(error.toString());
                }
        );
  }

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


function returnFormatedRoles(type, response){

  let formatedList =[]
  if(type === 'privileges')
  {
      formatedList = response.map(
          items => 
          ({
              id : items.privilegeId,
              name : items.name,
              date : items.createdAt===null? '--' : items.createdAt
           }));
  }
  else{
      formatedList = response.map(
          items => 
          ({
              id : items.applicationId,
              name : items.name,
              date : items.createdAt===null? '--' : items.createdAt
           }));
  }
   
      return formatedList;
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


function buildURL(entity, pageIndex, limit, include, institutionId) 
{
    let queryParameter =""
    entity = returnEntityForInstitution(entity,institutionId);
    if(include)
    {
      queryParameter=entity+"?offset="+pageIndex+"&limit="+limit+"&include=institutions";
    }
    else
    {
      queryParameter=entity+"?offset="+pageIndex+"&limit="+limit;
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
    const institutionList = response.data.included?.institution !== undefined ? response.data.included.institution:[];
  
        const formatedUsers = usersList.map((x) => ({
        userId: x.userId,
        name: x.name,
        email: x.email,
        phone: validate(x.phone),
        createdAt: validate(x.createdAt),
        roles:x.roles,
        institution: institutionList.filter(y => y.institutionId === x.institutionId)[0]
    }));

    let users= {
      data : formatedUsers,
      page : response.data.pagination
    }
  
    return users;
}




//Save User Detail
export function saveUser(user,action) {

    return dispatch => {
        dispatch(saveUserDataRequest);
        if (action === "add") {
          apiHandler.post('signup', user)
              .then(
                users => {
                    dispatch(saveUserDataSuccess());
                },
                error => {
                    alert(error.message.toString() );
                });
        }
        else {
          apiHandler.put('users' , user)
              .then(
                users => {
                    dispatch(saveUserDataSuccess());
                },
                error => {
                    alert(error.toString());
                });
        }
    }

}
function saveUserDataRequest() { return { type: userConstants.saveUsers_REQUEST } }
function saveUserDataSuccess() { return { type: userConstants.saveUsers_SUCCESS } }


export function saveApplications(application, action){
  return dispatch =>{
      dispatch(saveRequest('applications'))
      if (action === "save")
      {
        apiHandler.put('applications',application)
          .then(
              response => { dispatch(saveSuccess('applications',response.data))},
              error => {dispatch(saveFailure('applications',error))}
          )
      }
      else
      {
        apiHandler.post('applications',application)
        .then(
            response => { dispatch(saveSuccess('applications',response.data))},
            error => {dispatch(saveFailure('applications',error))}
        )
      }
  }
}


export function savePrivileges(privilege, action){
  return dispatch =>{
      dispatch(saveRequest('privileges'))
      if (action === "save")
      {
        apiHandler.put('privileges',privilege)
        .then(
            response => { dispatch(saveSuccess('privileges',response.data))},
            error => {dispatch(saveFailure('privileges',error))}
        )
      }
      else
      {
        apiHandler.post('privileges',privilege)
        .then(
            response => { dispatch(saveSuccess('privileges',response.data))},
            error => {dispatch(saveFailure('privileges',error))}
        )
      }
      
  }
}



function saveRequest(action){

  if(action === 'applications')
  return { type : userConstants.getApplications_REQUEST }
  else
  return { type : userConstants.getPrivileges_REQUEST }

}

function saveSuccess(action, payload) {

  if(action ==='applications')
  return { type : userConstants.saveApplications_SUCCESS, payload: payload}
  else
  return { type : userConstants.savePrivilidges_SUCCESS, payload: payload}

}

function saveFailure(action, payload) {

  if(action === 'applications')
  return { type : userConstants.getApplications_ERROR, payload: payload }
  else
  return { type : userConstants.getPrivileges_ERROR, payload: payload }

}



function getRequest(action){

  if(action === 'applications')
  return { type : userConstants.getApplications_REQUEST }
  else
  return { type : userConstants.getPrivileges_REQUEST }

}

function getSuccess(action, payload) {

  if(action ==='applications')
  return { type : userConstants.update_APPLICATIONS, payload: payload}
  else
  return { type : userConstants.update_PRIVILEGES, payload: payload}

}

function getFailure(action, payload) {

  if(action === 'applications')
  return { type : userConstants.getApplications_ERROR, payload: payload }
  else
  return { type : userConstants.getPrivileges_ERROR, payload: payload }

}


