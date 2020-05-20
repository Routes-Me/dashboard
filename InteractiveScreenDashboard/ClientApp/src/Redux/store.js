import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Redux/reducers';


//const store = () => applyMiddleware(thunk)(createStore)(rootReducer);

export default createStore(rootReducer, applyMiddleware(thunk));