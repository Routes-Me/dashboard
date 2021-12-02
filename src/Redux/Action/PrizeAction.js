import apiHandler from '../../util/request';
import { prizeConstants } from '../../constants/prizeConstants';


export function getCandidates(pageIndex, limit, drawsId) {

    return dispatch => {
        dispatch(candidateRequest());
        apiHandler.get(buildURL('candidates', pageIndex, limit, false, drawsId))
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


export function getDraws(pageIndex, limit) {

    return dispatch => {
        dispatch(drawRequest());
        apiHandler.get(buildURL('draws', pageIndex, limit, false))
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


export function getFreeRides(pageIndex, limit, freeRideId) {

    return dispatch => {
        dispatch(ProcessRequest());
        apiHandler.get(buildURL('free-rides', pageIndex, limit, false, freeRideId))
            .then(
                users => {
                    dispatch(ListFreeRides(returnFormatedResponse(users)));
                },
                error => {
                    alert(error.toString());
                }
            );
    }

}

export function getRedemptionList(pageIndex, limit, status) {

    return dispatch => {
        dispatch(ProcessRequest());
        apiHandler.get(buildURL('free-rides', pageIndex, limit, false, status))
            .then(
                users => {
                    dispatch(ListRedemptions(returnFormatedResponse(users)));
                },
                error => {
                    alert(error.toString());
                }
            );
    }
}

export function saveFreeRide(ride) {
    return dispatch => {
        dispatch(ProcessRequest());
        apiHandler.get(buildURL('free-rides', ride))
            .then(
                ride => {
                    dispatch(ListRedemptions(returnFormatedResponse(ride)));
                },
                error => {
                    alert(error.toString());
                });
    }
}

function ProcessRequest() { return { type: prizeConstants.REQUEST } }

function ListFreeRides(Rides) { return { type: prizeConstants.FreeRides_Success, payload: Rides } }

function ListRedemptions(redeemedList) { return { type: prizeConstants.Redemptions_Success, payload: redeemedList } }


function returnFormatedResponse(response) {
    let formatedResponse = {
        data: response.data.data,
        page: response.data.pagination
    }
    return formatedResponse;
}



function buildURL(entity, pageIndex, limit, include, drawsId) {

    let queryParameter = "";
    if (include) {
        queryParameter = entity + "?offset=" + pageIndex + "&limit=" + limit + "&include=media,institution,campaign";
    }
    else {
        const filter = drawsId ? `draws/${drawsId}/${entity}` : entity;
        queryParameter = filter + "?offset=" + pageIndex + "&limit=" + limit;
    }
    return queryParameter;

}