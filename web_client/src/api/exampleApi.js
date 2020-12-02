import axiosClient from './axiosClient';

const exampleApi = {
  filter: async (skip, take, data, success, failure, beforeGet) => {
    if (beforeGet) beforeGet();

    try {
      const response = await axiosClient.post(
        `api/examples/filter/${skip}/${take}`,
        data,
      );
      if (success) success(response);
    } catch (ex) {
      if (failure) failure();
      console.error(ex);
    }
  },
  getAllExamples: async (success, failure, beforeGet) => {
    if (beforeGet) beforeGet();

    try {
      const response = await axiosClient.get(`api/examples`);
      if (success) success(response);
    } catch (ex) {
      if (failure) failure();
      console.error(ex);
    }
  },
};

export default exampleApi;
