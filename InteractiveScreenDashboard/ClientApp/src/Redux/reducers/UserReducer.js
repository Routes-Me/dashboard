import { userConstants } from '../../constants/userConstants';

const INITIAL_STATE = {
    Users: [],
    Loading: true,
    hasError: false,
    error: null
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.getUsers_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case userConstants.getUsers_SUCCESS:
            return {
                ...state,
                Loading: true,
                hasError: false,
                Users: action.payload
            };
        case userConstants.saveUsers_REQUEST:
            return {
                ...state,
                Loading: true,
                hasError: false
            };
        case userConstants.saveUsers_SUCCESS:
            return {
                ...state,
                Loading: false,
                hasError: false
            };
        default:
            return state;
    }
}

export default UserReducer;