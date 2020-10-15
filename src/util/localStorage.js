
import {setAuthorizationToken} from '../util/request';

export function setToken(token) {
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
  }

  export function clearStorage() {
    localStorage.removeItem('token');
  }

  export function getToken(){
      if(localStorage.getItem('token')==null){
          return undefined;
      }
      else{
          return localStorage.getItem('token');
      }
  }
 
  export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};



export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        return undefined;
    }
}
