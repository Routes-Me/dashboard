import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './Redux/store';

import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
require('dotenv').config();



ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
     <App />   
    </BrowserRouter>
    </Provider>
    ,rootElement);

registerServiceWorker();

