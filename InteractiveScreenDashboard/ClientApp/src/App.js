import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import { vehicles } from './components/vehicles';
import { savePassword } from './components/savePassword';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
        <Route exact path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/forgotpassword' component={Counter} />
        <Route path='/newpassword' component={savePassword} />
        <Route path='/vehicles' component={vehicles} />
      </Layout>
        );
    }
}