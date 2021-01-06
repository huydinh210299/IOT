// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { notification } from 'antd';
import { notifFailure } from '../components/Shared/Notification';
require('dotenv').config();
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs
const URL = process.env.REACT_APP_URL_8080;

const axiosClient = axios.create({
  //timeout: 5000,
  //baseURL: 'http://localhost:4000',
  baseURL: 'http://iot.ithust.xyz:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    notifFailure(error);
    throw error;
  },
);

export default axiosClient;
