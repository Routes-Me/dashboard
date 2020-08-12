import { MockServerData } from '../../constants/MockServerData';
import { userConstants } from '../../constants/userConstants';

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