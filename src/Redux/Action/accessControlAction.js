import { accessControlConstants } from '../../constants/accessControlConstant';
import { config } from "../../constants/config";
import apiHandler from '../../util/request';


function buildURL(entity, offset, include) {

    let queryParameter =""
    if(include){
      queryParameter=entity+"?offset="+offset+"&limit="+config.Pagelimit+"&include=";
    }
    else{
      queryParameter=entity+"?offset="+offset+"&limit="+config.Pagelimit;
    }
    return queryParameter;

}


export function getApplications(){
    return dispatch =>{
        dispatch(request('Applications'))
        apiHandler.get(buildURL('applications',1,false))
            .then(
                response => { dispatch(success(response.data.data))},
                error => {dispatch(failure(error))}
            )
    }
}


export function getPrivileges(){
    return dispatch =>{
        dispatch(request('privileges'))
        apiHandler.get(buildURL('privileges',1,false))
            .then(
                response => { dispatch(success(response.data.data))},
                error => {dispatch(failure(error))}
            )
    }
}



export function saveApplications(application, action){
    return dispatch =>{
        dispatch(request('Applications'))
        apiHandler.post(buildURL('applications',1,false))
            .then(
                response => { dispatch(success(response.data.data))},
                error => {dispatch(failure(error))}
            )
    }
}


export function savePrivileges(privilege, action){
    return dispatch =>{
        dispatch(request('privileges'))
        apiHandler.post(buildURL('privileges',1,false))
            .then(
                response => { dispatch(success(response.data.data))},
                error => {dispatch(failure(error))}
            )
    }
}

function request(action){

    if(action === 'Applications')
    return { type : accessControlConstants.getApplications_REQUEST }
    else
    return { type : accessControlConstants.getPrivilidges_REQUEST }

}

function success(action, payload) {

    if(action ==='Applications')
    return { type : accessControlConstants.getApplications_SUCCESS, payload: payload}
    else
    return { type : accessControlConstants.getPrivilidges_SUCCESS, payload: payload}

}

function error(action, payload) {

    if(action === 'Applications')
    return { type : accessControlConstants.getApplications_ERROR, payload: payload }
    else
    return { type : accessControlConstants.getPrivilidges_ERROR, payload: payload }

}