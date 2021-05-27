import { routesConstants } from "../../constants/routesConstants";


const INITIAL_STATE = {
    loading : false,
    error   : '',
    routes : [],
    tickets : [],
    fares : [],
    currency : [],
    actionState :''
}

const RoutesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case routesConstants.getRoutes_REQUEST:
            return{
                ...state,
                loading: true,
                actionState : action.type
            }
        case routesConstants.getRoutes_SUCCESS:
            return{
                ...state,
                loading: false,
                routes: action.payload,
                actionState: action.type
            }
        case routesConstants.getRoutes_ERROR:
            return{
                ...state,
                loading : false,
                error   : action.payload
            }
        case routesConstants.saveRoutes_REQUEST:
            return{
                ...state,
                loading:true,
                actionState: action.type
            }
        case routesConstants.saveRoutes_SUCCESS:
            return{
                ...state,
                loading:false,
                actionState: routesConstants.updateList
            }
        case routesConstants.saveRoutes_FAILURE:
            return{
                ...state,
                loading:false,
                actionState: action.type
            }
        case routesConstants.deleteRoutes_REQUEST:
            return{
                ...state,
                loading:true,
                actionState: action.type
            }
        case routesConstants.deleteRoutes_SUCCESS:
            return{
                ...state,
                loading:false,
                actionState: routesConstants.updateList
            }
        case routesConstants.deleteRoutes_FAILURE:
            return{
                ...state,
                loading:false,
                actionState: action.type
            }
        case routesConstants.getTickets_REQUEST:
            return{
                ...state,
                loading: true,
                actionState : action.type
            }
        case routesConstants.getTickets_SUCCESS:
            return{
                ...state,
                loading: false,
                tickets: action.payload,
                actionState: action.type
            }
        case routesConstants.getTickets_ERROR:
            return{
                ...state,
                loading : false,
                error   : action.payload
            }
        case routesConstants.saveTickets_REQUEST:
            return{
                ...state,
                loading:true,
                actionState: action.type
            }
        case routesConstants.saveTickets_SUCCESS:
            return{
                ...state,
                loading:false,
                actionState: routesConstants.updateList
            }
        case routesConstants.saveTickets_FAILURE:
            return{
                ...state,
                loading:false,
                actionState: action.type
            }
        case routesConstants.deleteTickets_REQUEST:
            return{
                ...state,
                loading:true,
                actionState: action.type
            }
        case routesConstants.deleteTickets_SUCCESS:
            return{
                ...state,
                loading:false,
                actionState: routesConstants.updateList
            }
        case routesConstants.deleteTickets_FAILURE:
            return{
                ...state,
                loading:false,
                actionState: action.type
            }
        case routesConstants.updateCurrencyList:
            return{
                ...state,
                loading:false,
                currency:action.payload,
                actionState: action.type
            }
        default:
            return state;
    }
};

export default RoutesReducer;