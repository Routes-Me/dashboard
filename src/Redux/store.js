import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Redux/reducers/Index';
//import loggerMiddleware from './middleware/logger';
import { saveState, loadState } from '../util/localStorage';

//const store = () => applyMiddleware(loggerMiddleware,thunk)(createStore)(rootReducer);


//console.log("/index.js => Current State : ", store.getState);

//export default store;


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

//loggerMiddleware,

const store = createStore(rootReducer, persistedState, composeEnhancer(applyMiddleware(thunk)));

//store.subscribe(() => saveToLocalStorage(store.getState()));

store.subscribe(() => { saveState(store.getState()); });

export default store;