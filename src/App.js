

import React, { Component, Suspense, lazy } from 'react';
import { Router, Route, Switch, useLocation } from 'react-router-dom';
import { history } from '../src/helper/history';
import { Layout } from './components/Layout';
import { UsersDetail } from './components/Home/Child/Users/UsersDetail';
import { PrivateRoute } from './helper/PrivateRoute';
import Launch from './components/Launch';
import { Registration } from './components/Login/Registration';
const ForgotPassword = lazy(() => import('./components/Password/ForgotPassword'));
const savePassword = lazy(() => import('./components/Password/savePassword'));
const ResetPassword = lazy(() => import('./components/Password/ResetPassword'));
const Home = lazy(() => import('./components/Home/Home'));
const Login = lazy(() => import('./components/Login/Login'));

export default class App extends Component {

    static displayName = App.name;


    render() {
        return (
            <Layout>
                <Router  history={history}>
                    <Switch>
                        <Suspense fallback={<Launch/>}>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/AddAccount' component={UsersDetail}/>
                        <PrivateRoute exact path='/home' component={Home} />
                        <Route path='/forgotpassword' component={ForgotPassword} />
                        <Route path='/newpassword' component={savePassword} />
                        <Route path='/resetpassword/:email' component={ResetPassword}/>
                        <Route path='/registeration' component={Registration}/>
                        {/* <Redirect from="*" to="/" component={Login}/> */}
                        </Suspense>
                    </Switch>
                </Router >
            </Layout>
        );
    }
}

