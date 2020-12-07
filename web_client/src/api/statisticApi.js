import axiosClient from "./axiosClient";
import { notification } from "antd";

const statisticApi = {
  sensor: async (begin, end) => {
    try {
      const response = await axiosClient.get(
        `api/sensor?begin=${begin}&end=${end}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default statisticApi;
