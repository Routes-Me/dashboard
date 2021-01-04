import apiHandler from '../../util/request';
import { prizeConstants }  from '../../constants/prizeConstants'; 


export function getCandidates(pageIndex,limit,drawsId) {

    return dispatch => {
        dispatch(candidateRequest());
        apiHandler.get(buildURL('candidates',pageIndex,limit,false,drawsId))
        .then(
                users => {
                    dispatch(storeCandidateData(returnFormatedResponse(users)));
                },
                error => {
                    alert(error.toString());
                }
            );
    }

}

function candidateRequest() { return { type: prizeConstants.Candidate_REQUEST } }

function storeCandidateData(Users) { return { type: prizeConstants.Candidate_SUCCESS, payload: Users } }


export function getDraws(pageIndex,limit) {

    return dispatch => {
        dispatch(drawRequest());
        apiHandler.get(buildURL('draws',pageIndex,limit,false))
        .then(
                users => {
                    dispatch(storeDrawsData(returnFormatedResponse(users)));
                },
                error => {
                    alert(error.toString());
                }
            );
    }

}

function drawRequest() { return { type: prizeConstants.Draws_REQUEST } }

function storeDrawsData(draws) { return { type: prizeConstants.Draws_SUCCESS, payload: draws } }

function returnFormatedResponse(response) {
    let formatedResponse= {
      data : response.data.data,
      page : response.data.pagination
    }
    return formatedResponse;
}



function buildURL(entity, pageIndex, limit, include, drawsId) {

    let queryParameter ="";
    if(include){
      queryParameter=entity+"?offset="+pageIndex+"&limit="+limit+"&include=media,institution,campaign";
    }
    else{
      const filter = drawsId? `draws/${drawsId}/${entity}` : entity ;
      queryParameter=filter+"?offset="+pageIndex+"&limit="+limit;
    }
    return queryParameter;

}