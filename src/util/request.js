import axios from "axios";
import { config } from "../constants/config";
import { history } from "../helper/history";
import {getToken, clearStorage} from '../util/localStorage';

const instance = axios.create({
  baseURL: config.Domain,
});

export async function setAuthorizationToken(token) {
  instance.interceptors.request.use(
    function (config) {
      if (token) 
      {
        config.headers["Authorization"] = "Bearer " + token;
      } 
      else if (getToken() != null) 
      {
        config.headers["Authorization"] = "Bearer " + getToken();
      }
      else
      {
        history.push('/');
      }
      return config;
    },
    function (error) {
      history.push('/');
      return Promise.reject(error);
    }
  );
}


instance.interceptors.response.use(
  function success(param) {
    console.log(`${param.method} response send from ${param.url} at ${new Date().getTime()}`);
    return param;
  },
  function failure(error) {
    if(401 === error.response.status)
    clearStorage();
    history.push('/');
    return Promise.reject(error);
  }
);


export default instance;
