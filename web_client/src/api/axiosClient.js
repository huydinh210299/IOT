// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { notification } from 'antd';
import { notifFailure } from '../components/Shared/Notification';

// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
  //timeout: 5000,
  baseURL: 'http://localhost:4000',
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
    debugger;
    notifFailure(error);
    throw error;
  },
);

export default axiosClient;
