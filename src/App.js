

import React, { Component, Suspense, lazy } from 'react';

//import { Route } from 'react-router';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../src/helper/history';
import { Layout } from './components/Layout';
import { Login } from './components/Login/Login';
import { UsersDetail } from './components/Users/UsersDetail';
import { PrivateRoute } from './helper/PrivateRoute';
import Launch from './components/Launch';

//import { ForgotPassword } from './components/ForgotPassword';
//import { savePassword } from './components/savePassword';
//import { ResetPassword } from './components/ResetPassword';


//React.lazy(async () => (await import('./foo/foo').MyComponent)
//const PrivateRoute = lazy(() => import('./components/PrivateRoute'))
//const Home = lazy(async () => (await import('./components/Home')));
const ForgotPassword = lazy(() => import('./components/Password/ForgotPassword'));
const savePassword = lazy(() => import('./components/Password/savePassword'));
const ResetPassword = lazy(() => import('./components/Password/ResetPassword'));
const Home = lazy(() => import('./components/Home'));


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Router  history={history}>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/AddAccount' component={UsersDetail}/>
                        <Suspense fallback={<Launch/>}>
                        <PrivateRoute exact path='/home' component={Home} />
                        <Route path='/forgotpassword' component={ForgotPassword} />
                        <Route path='/newpassword' component={savePassword} />
                        <Route path='/resetpassword/:email' component={ResetPassword}/>
                        {/* <Redirect from="*" to="/" component={Login}/> */}
                        </Suspense>
                    </Switch>
                </Router >
            </Layout>
        );
    }
}

