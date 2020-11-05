import { accessControlConstant } from '../../constants/accessControlConstant';
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

function returnFormatedResponse(type, response){

    let formatedList =[]
    if(type === 'privileges')
    {
        formatedList = response.map(
            items => 
            ({
                id : items.privilegeId,
                name : items.name
             }));
    }
    else{
        formatedList = response.map(
            items => 
            ({
                id : items.applicationId,
                name : items.name
             }));
    }
     
        return formatedList;
}


export function getApplications(){
    return dispatch =>{
        dispatch(request('Applications'))
        apiHandler.get(buildURL('applications',1,false))
            .then(
                response => { dispatch(success('applications',returnFormatedResponse('applications', response.data.data)))},
                error => {dispatch(failure(error))}
            )
    }
}


export function getPrivileges(){
    return dispatch =>{
        dispatch(request('privileges'))
        apiHandler.get(buildURL('privileges',1,false))
            .then(
                response => { dispatch(success('privileges',returnFormatedResponse('privileges' , response.data.data)))},
                error => {dispatch(failure(error))}
            )
    }
}



export function saveApplications(application, action){
    return dispatch =>{
        dispatch(request('applications'))
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

    if(action === 'applications')
    return { type : accessControlConstant.getApplications_REQUEST }
    else
    return { type : accessControlConstant.getPrivilidges_REQUEST }

}

function success(action, payload) {

    if(action ==='applications')
    return { type : accessControlConstant.getApplications_SUCCESS, payload: payload}
    else
    return { type : accessControlConstant.getPrivilidges_SUCCESS, payload: payload}

}

function failure(action, payload) {

    if(action === 'applications')
    return { type : accessControlConstant.getApplications_ERROR, payload: payload }
    else
    return { type : accessControlConstant.getPrivilidges_ERROR, payload: payload }

}