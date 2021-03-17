import axios from "axios";
import { config } from "../constants/config";
import { history } from "../helper/history";
import {getToken, clearStorage} from '../util/localStorage';


const apiURL = process.env.REACT_APP_APIDOMAIN;

console.log('BASE URL in Axios', process.env.REACT_APP_APIDOMAIN);

const instance = axios.create({
  baseURL: process.env.REACT_APP_APIDOMAIN
});

// export async function setAuthorizationToken(token) {

//   instance.interceptors.request.use(

//     function (config) {
//       if (token!=null) 
//       {
//           config.headers["Authorization"] = "Bearer " + token;
//       } 
//       else if (getToken() != null) 
//       {
//         config.headers["Authorization"] = "Bearer " + getToken();
//       }
//       else
//       {
//         history.push('/');
//       }

//       config.headers["Content-Type"] = (config.url ==='medias' && config.method ==='post')? "multipart/form-data" :  "application/json; charset=utf-8";      

//       return config;

//     },
//     function (error) {
//       history.push('/');
//       return Promise.reject(error);
//     }

//   );

// }


instance.interceptors.request.use(

  async function (config) {
    const token = await getToken();
    
    if (token!=null) 
    {
        config.headers["Authorization"] = "Bearer " + token;
    }
    else
    {
      history.push('/');
    }

    config.headers["Content-Type"] = (config.url ==='medias' && config.method ==='post')? "multipart/form-data" :  "application/json; charset=utf-8";      
    config.headers['Application'] = 'dashboard';
    return config;

  },
  function (error) {
    history.push('/');
    return Promise.reject(error);
  }

);

// instance.interceptors.response.use(
//   function success(param) {
//     //console.log(`${param.method} response send from ${param.url} at ${new Date().getTime()}`);
//     return param;
//   },
//   function failure(error) {
//     // if((error.response.status === 401 ))
//     // {
//     //   clearStorage();
//     //   history.push('/');
//     // }
//     if(error.response.status === 401)
//     {
//       let token = Promise.getToken();
//       instance.defaults.headers.common['Authorization'] = "Bearer " + getToken();
//       //setAuthorizationToken(token);
//     }
//     return Promise.reject(error);
//   }
// );


export default instance;
