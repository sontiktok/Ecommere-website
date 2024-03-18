import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: (query) => {
    const url = `/histories${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/histories/${id}`;
    return axiosClient.get(url);
  },

  getAll: () => {
    const url = "/histories/all";
    return axiosClient.get(url);
  },

  changeStatus: (id) => {
    const url = `/histories/${id}`;
    return axiosClient.patch(url);
  },
};

export default HistoryAPI;
