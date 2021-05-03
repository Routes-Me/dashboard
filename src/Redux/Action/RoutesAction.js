import apiHandler from '../../util/request';
import { routesConstants } from '../../constants/routesConstants';


export function getRoutes(pageIndex,limit) {

    return dispatch => {
        dispatch(routesRequest());
        apiHandler.get(buildURL('routes',pageIndex,limit,true))
        .then(
                routes => {
                    dispatch(storeRoutes(returnFormatedResponse(routes)));
                },
                error => {
                    alert(error.toString());
                }
            );
    }
}

function routesRequest() { return { type: routesConstants.getRoutes_REQUEST } }

function storeRoutes(routes) { return { type: routesConstants.getRoutes_SUCCESS, payload: routes } }


export function getTickets(pageIndex,limit) {

    return dispatch => {
        dispatch(ticketsRequest());
        apiHandler.get(buildURL('tickets',pageIndex,limit,true))
        .then(
                routes => {
                    dispatch(storeTickets(returnFormatedResponse(routes)));
                },
                error => {
                    alert(error.toString());
                }
            );
    }
}

function ticketsRequest() { return { type: routesConstants.getTickets_REQUEST } }

function storeTickets(tickets) { return { type: routesConstants.getTickets_SUCCESS, payload: tickets } }


export function saveRoute(route, action) {

    return dispatch => {
        dispatch(saveRoutesRequest());
        if(action === 'add')
        {
            apiHandler.post('routes',route)
            .then(
                routes => {
                    dispatch(saveRoutesSuccess(routes));
                },
                error => {
                    alert(error.toString());
                }
            );
        }
        if(action === 'save'){
            apiHandler.put('routes',route)
            .then(
                routes => {
                    dispatch(saveRoutesSuccess(routes));
                },
                error => {
                    alert(error.toString());
                }
            );
        }
    }
}

function saveRoutesRequest() { return { type: routesConstants.saveRoutes_REQUEST } }

function saveRoutesSuccess(routes) { return { type: routesConstants.saveRoutes_SUCCESS, payload: routes } }


export function saveTicket(ticket, action) {

    return dispatch => {
        dispatch(saveTicketRequest());
        if(action === 'add')
        {
            apiHandler.post('tickets',ticket)
            .then(
                routes => {
                    dispatch(saveTicketSuccess(ticket));
                },
                error => {
                    alert(error.toString());
                }
            );
        }
        if(action === 'save'){
            apiHandler.put('tickets',ticket)
            .then(
                routes => {
                    dispatch(saveTicketSuccess(ticket));
                },
                error => {
                    alert(error.toString());
                }
            );
        }
    }
}

function saveTicketRequest() { return { type: routesConstants.saveTickets_REQUEST } }

function saveTicketSuccess(ticket) { return { type: routesConstants.saveTicketSuccess, payload: ticket } }


export function deleteRoute(id){
    return dispatch => {
        dispatch(deleteRouteRequest())
        apiHandler.delete('routes',id)
        .then(
            response => {
                dispatch(deleteRouteSucces())
            },
            error => {
                dispatch(console.log(error))
            }
        )
    }
}

function deleteRouteRequest() {
    return { type : routesConstants.deleteRoutes_REQUEST }
}

function deleteRouteSucces() {
    return { type: routesConstants.deleteRoutes_SUCCESS }
}

export function deleteTicket(id){
    return dispatch => {
        dispatch(deleteTicketRequest())
        apiHandler.delete('tickets',id)
        .then(
            response => {
                dispatch(deleteTicketSucces())
            },
            error => {
                dispatch(console.log(error))
            }
        )
    }
}

function deleteTicketRequest() {
    return { type : routesConstants.deleteTickets_REQUEST } 
}

function deleteTicketSucces() {
    return { type: routesConstants.deleteTickets_SUCCESS }
}


export function getCurrency() {
    return dispatch => {
        apiHandler.get('currency')
        .then(
            response => {
                dispatch(updateCurrencyList(response))
            },
            error => {
                console.log('Error in get currency :: ', error);
            }
        )
    }
}

function updateCurrencyList(list) {
    return { type: routesConstants.updateCurrencyList, payload:list }
}


function returnFormatedResponse(response) {
    let formatedResponse= {
        data : response.data.data,
        page : response.data.pagination
    }
    return formatedResponse;
}



function buildURL(entity, pageIndex, limit, include, drawsId) {

    let queryParameter ="";
    queryParameter=entity+"?offset="+pageIndex+"&limit="+limit;
    if(include){
      queryParameter=queryParameter+"&include=tariffs";
    }
    return queryParameter;

}