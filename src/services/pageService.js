import axiosIntance from "../utils/axiosInstance";

export const pageService = {
  getPageData(query) {
    return axiosIntance.get(`/pages${query}`);
  },
  getPageDataByName(name, query = "") {
    return axiosIntance.get(`/pages/${name}${query}`);
  },
};
