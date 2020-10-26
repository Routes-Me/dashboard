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
        if(config.url ==='medias' && config.method ==='post'){
          config.headers["Authorization"] = 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2IiwiTmFtZSI6Im1hbmFnZXIiLCJFbWFpbCI6Im5pcm1hbDAwMTEyMzUzZDQxQGdtYWlsLmNvbSIsIlBob25lTnVtYmVyIjoiIiwiUGFzc3dvcmQiOiJSNWxHOXVNUldoZz0uYU4wbnM3eXU1bUFucVFHVUhtOEVqYVlPejRZczIyNUlUYlRtaEg1alYwbz0iLCJSb2xlcyI6Ilt7XCJBcHBsaWNhdGlvblwiOlwic2NyZWVuXCIsXCJQcml2aWxlZ2VcIjpcInN1cGVyXCJ9XSIsIkluc3RpdHV0aW9uSWQiOiIiLCJleHAiOjE2MTc2NDA1NDIsImlzcyI6IlRyYWNrU2VydmljZSIsImF1ZCI6IlRyYWNrU2VydmljZSJ9.Nf-aRwcGYRWU7xju5r9XEmJlYLdfD0o2ypH68P1k0ag'
        }
        else{
          config.headers["Authorization"] = "Bearer " + token;
        }
        
      } 
      else if (getToken() != null) 
      {
        config.headers["Authorization"] = "Bearer " + getToken();
      }
      else
      {
        history.push('/');
      }

      config.headers["Content-Type"] = (config.url ==='medias' && config.method ==='post')? "multipart/form-data" :  "application/json; charset=utf-8";      

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
    if(error.response.status === 401)
    {
      clearStorage();
      history.push('/');
    }
    return Promise.reject(error);
  }
);


export default instance;
