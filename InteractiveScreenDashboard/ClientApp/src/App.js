import React, { Component } from 'react';

//import { Route } from 'react-router';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../src/helper/history';

import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { Login }  from './components/Login';
import { vehicles } from './components/vehicles';
import { savePassword } from './components/savePassword';
import { Banner } from './components/Banner';
import './custom.css';



export default class App extends Component {
    static displayName = App.name;

    

    render() {
        return (
            <Layout>
                <Router  history={history}>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/home' component={Home} />
                        <Route path='/forgotpassword' component={Counter} />
                        <Route path='/newpassword' component={savePassword} />
                        <Route path='/vehicles' component={vehicles} />
                        <Route path='/Banner' component={Banner} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router >
            </Layout>
        );
    }
}

