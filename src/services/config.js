import axios from "axios";
import { getLocal } from "../utils/localStorage";


export const USER_LOGIN = "USER_LOGIN";
const URL_DOMAIN = "https://jiranew.cybersoft.edu.vn";
const TokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0OCIsIkhldEhhblN0cmluZyI6IjAxLzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTI1MTIwMDAwMCIsIm5iZiI6MTY3OTY3NzIwMCwiZXhwIjoxNzA5Mzk4ODAwfQ.PYqb4lt99GjfsuJWyp9AatShLHcDdjyMBycYAPqW0aY";
const user = getLocal("user");


// Add a request interceptor
const https = axios.create({
  baseURL: URL_DOMAIN,
  headers: {
    TokenCybersoft: TokenCybersoft,
    Authorization: "Bearer " + user?.accessToken,
  },
});
https.interceptors.request.use(
  function (config) {
    return {
      ...config,
    };
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default https;
