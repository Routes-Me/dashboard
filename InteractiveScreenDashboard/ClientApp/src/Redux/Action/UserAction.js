import { MockServerData } from '../../constants/MockServerData';
import { userConstants } from '../../constants/userConstants';


//Get UsersList
export function getUsers(id) {

    return dispatch => {

        dispatch(UsersDataRequest());
        const Users = MockAPICallForUsers();
        dispatch(UsersDataReceived(Users));

    }

}


function MockAPICallForUsers() {
    const res = MockServerData.UsersMockServerData;
    const UsersList = res.data.users;
    return UsersList;
}


function UsersDataRequest() {
    return { type: userConstants.getUsers_REQUEST }
};

function UsersDataReceived(Users) {
    return { type: userConstants.getUsers_SUCCESS, payload: Users }
};


//Save User
export function saveUser(user) {
    return dispatch => {
        dispatch(saveUserDataRequest());
        const User = MockAPICallForSaveUser();
        dispatch(saveUserDataSuccess());
    }
}

function MockAPICallForSaveUser() {

}

function saveUserDataRequest() {
    return { type: userConstants.saveUsers_REQUEST };
}

function saveUserDataSuccess() {
    return { type: userConstants.saveUsers_SUCCESS };
}