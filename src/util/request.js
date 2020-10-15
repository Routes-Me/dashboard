import axios from "axios";
import { config } from "../constants/config";

const instance = axios.create({
  baseURL: config.Domain,
});

export async function setAuthorizationToken(token) {
  instance.interceptors.request.use(
    function (config) {
      // const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      } else if (localStorage.getItem("token") != null) {
        config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
      }
      else
      {
        window.location.href = '/'
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}



export default instance;
