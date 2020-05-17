import axios from 'axios';
export const Login_REQUEST = 'LOGIN_REQUEST';
export const Login_SUCCESS = 'LOGIN_SUCCESS';
export const Login_LOGOUT = 'LOGIN_LOGOUT';
export const Login_FAILURE = 'LOGIN_FAILURE';

export const userActions = {
    userSignInRequest,
    logout,
    getLoginSuccess,
    getLoginFailure,
    getUser
};

const getLoginSuccess = payload => ({
    type: Login_SUCCESS,
    payload
});

const getLoginFailure = payload => ({
    type: Login_FAILURE,
    payload
});


export const getUser = user => ({
    type: 'GET_USER',
    payload: user
});



function userSignInRequest(username, password){
    return dispatch => {
        dispatch(request({ username }));

        let UserObject = {
            userName: username,
            password: password
        };

        axios.post('https://localhost:5001/api/Accounts/Login', UserObject)
            .then(
                user => {
                    dispatch(success(user));
                    this.props.history.push("/Home");
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: Login_REQUEST, user }; }
    function success(user) { return { type: Login_SUCCESS, user }; }
    function failure(error) { return { type: Login_FAILURE, error }; }
}

function logout() {
    //userService.logout();
    return { type: Login_LOGOUT };
}

export default LoginAction;
