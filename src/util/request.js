import axios from "axios";
import { config } from "../constants/config";
import { history } from "../helper/history";
import {getToken, setToken, setRefreshToken, clearStorage, getRefreshToken} from '../util/localStorage';


const apiURL = process.env.REACT_APP_APIDOMAIN;
let requestRefreshTokenInterval = '';

console.log(`Domain :: ${process.env.NODE_ENV} URL in Axios ${apiURL}`);

const instance = axios.create({
  baseURL: apiURL
});

 // instance.defaults.withCredentials= true;

instance.interceptors.request.use(

  async function (config) {
    const token = await getToken();
    
    config.headers['application'] = 'dashboard';
    if (token!=null) 
    {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // else
    // {
    //   // history.push('/');
    // }

    config.headers["Content-Type"] = (config.url ==='medias' && config.method ==='post')? "multipart/form-data" :  "application/json; charset=utf-8";      
    
    return config;

  },
  function (error) {
    history.push('/');
    return Promise.reject(error);
  }

);

instance.interceptors.response.use((response) => {
  return response
},
function (error) {
  const originalRequest = error.config;
  const statusCode = error.response.status;
  if(originalRequest.url === `${config.refreshTokenURL}`)
  {
    if(statusCode === 406)
    {
      console.log(`Status Code : ${statusCode}`)
      console.log('RefreshToken Expired')
      clearStorage();
      history.push('/');
    }
    if(statusCode === 400)
    {
      requestRefreshTokenInterval = setTimeout(() => {
        requestRefreshToken();
      }, 5*60000);
    }
  }

  if (error.response.status === 401 && originalRequest.url !== config.refreshTokenURL) {
      originalRequest._retry = true;
      requestRefreshToken()
      .then(res => {
          if (res.status === 201) {
              // 1) put token to LocalStorage
              setRefreshToken(res.data.refreshToken);
              setToken(res.data.accessToken)
              // 2) Change Authorization header
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
              // 3) return originalRequest object with Axios.
              return axios(originalRequest);
          }
      })
      // history.push('/');
  }

  // return Error object with Promise
  return Promise.reject(error);
});


const requestRefreshToken = async() => {
  const refreshToken = await getRefreshToken();
  console.log('refreshToken ',refreshToken);
  return instance.post('authentications/renewals',
  {
      "refresh_token": refreshToken
  })
  .then(
    function(response) {
      clearInterval(requestRefreshTokenInterval);
      return response;
    },
    function(error) {
      return error;
    }
  )
}




export default instance;
