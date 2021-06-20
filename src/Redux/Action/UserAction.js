import { userConstants } from '../../constants/userConstants';
import apiHandler from '../../util/request';
import { validate, returnEntityForInstitution } from '../../util/basic';
import axios from "axios";


//Get UsersList
export function getOfficers(pageIndex,limit,role,user) {

    return dispatch => {
        dispatch(UsersDataRequest());
        apiHandler.get(buildURL('officers',pageIndex,limit,true,role,user))
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



//get Invitation info 

export function getInvitationInfo(id, token) {
  console.log('get invitation info called !!')
  return dispatch => {
    dispatch(InvitationInfoRequest());
    axios.get(`${process.env.REACT_APP_APIDOMAIN}invitations/${id}`, {
      headers : { 'Authorization' : `Bearer ${token}` }
    })
    .then(
      info => {
        console.log('Invitee info ', info.data)
        dispatch(UpdateForm(info.data.data[0]));
      },
      error => {
        alert(error.toString());
      }
    )
  }
}

function InvitationInfoRequest() { return { type: userConstants.getInvitationInfo_REQUEST } }

function UpdateForm(userInfo){ return { type: userConstants.updateInvitationForm, payload: userInfo } }



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
          getOfficers();
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


function buildURL(entity, pageIndex, limit, include,role,user) 
{
    let queryParameter =""
    entity = returnEntityForInstitution(entity,role,user);
    if(include)
    {
      queryParameter=entity+"?offset="+pageIndex+"&limit="+limit+"&include=institutions,users,officers";
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

    const usersList = response.data.included?.users !== undefined ? response.data.included.users:[];
    const institutionList = response.data.included?.institution !== undefined ? response.data.included.institution:[];
  
        const formatedUsers = response.data.data.map((x) => ({
        userId: x.userId,
        name: usersList.filter(y => y.UserId === x.userId)[0]?.Name,
        email: usersList.filter(y => y.UserId === x.userId)[0]?.Email,
        phone: validate(x.phone),
        createdAt: validate(usersList.filter(y => y.UserId === x.userId)[0]?.CreatedAt),
        roles:x.roles,
        institution: institutionList.filter(y => y.InstitutionId === x.institutionId)[0]
    }));

    let users= {
      data : formatedUsers,
      page : response.data.pagination
    }
    return users;
}




//Save User Detail
export function sendInvitation(user) {

    return dispatch => {
        dispatch(saveUserDataRequest);
          apiHandler.post('invitations', user)
              .then(
                users => {
                    dispatch(saveUserDataSuccess());
                },
                error => {
                    alert(error.Message );
                });
    }

}
function saveUserDataRequest() { return { type: userConstants.sendInvitation_REQUEST } }
function saveUserDataSuccess() { return { type: userConstants.sendInvitation_SUCCESS } }



export function register(user,token) {

  return dispatch => {
      dispatch(saveUserDataRequest);
        apiHandler.post('registrations/dashboard-app',user,{
          headers : { 'Authorization' : `Bearer ${token}` }
        })
            .then(
              users => {
                  dispatch(saveUserDataSuccess());
              },
              error => {
                  console.log('error register ', error);
                  alert(error);
              });
  }

}


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


