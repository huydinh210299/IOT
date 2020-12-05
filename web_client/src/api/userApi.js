import axiosClient from './axiosClient';
import { notification } from 'antd';

const userApi = {
  login: async (data) => {
    try {
      const response = await axiosClient.post(`api/auth/login`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
