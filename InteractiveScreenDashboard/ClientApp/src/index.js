import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


import { Provider } from 'react-redux';
//import configureStore from './store/store';
//import React, { Component } from 'react';
import store from './Redux/store';



//1
//import thunk from 'redux-thunk';
//import { createStore, applyMiddleware } from 'redux';


//import React, { Component } from 'react';
//import store from './Redux/store';
//import { Provider } from 'react-redux';
//import { connect } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

//import { createStore } from 'redux';
//import rootReducer from './reducers/Index'


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

//3
//const store = configureStore({});

//1
//const store = createStore(
//    (state = {}) => state,
//    applyMiddleware(thunk)
//);

//2
//const store = createStore(rootReducer);

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Provider store={store}>
                <App />
        </Provider>
    </BrowserRouter>
    ,rootElement);

registerServiceWorker();

