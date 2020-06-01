import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Redux/reducers';
import loggerMiddleware from './middleware/logger';
import { saveState, loadState } from './localStorage';


//const store = () => applyMiddleware(loggerMiddleware,thunk)(createStore)(rootReducer);


//console.log("/index.js => Current State : ", store.getState);

//export default store;

//function saveToLocalStorage(state) {
//    try {
//        const serializedState = JSON.stringify(state);
//        localStorage.setItem('state', serializedState);
//    } catch (e) {
//        console.log(e);
//    }
//}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, composeEnhancer(applyMiddleware(loggerMiddleware, thunk)));

//store.subscribe(() => saveToLocalStorage(store.getState()));

store.subscribe(() => { saveState(store.getState()); });

export default store;