import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        cookie.load('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)