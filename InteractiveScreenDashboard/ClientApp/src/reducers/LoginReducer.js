import {
    Login_REQUEST,
    Login_SUCCESS,
    Login_LOGOUT,
    LOGIN_FAILURE
} from '../Action/LoginAction'

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    error: null,
    data: []
}


export default (state = INITIAL_STATE, action) => {
    switch (action.Type) {
        case Login_REQUEST:
            return {
                ...state,
                loading: true
            };
        case Login_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError:false,
                data: action.payload
            };
        case Login_LOGOUT:
            return {
                ...state,
                loading: false,
                hasError: true,
                data: action.payload
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: action.payload
            }
        default:
            return state;
    }
}