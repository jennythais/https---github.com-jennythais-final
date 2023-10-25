import axiosIntance from "../utils/axiosInstance";

export const subscribeService = {
  getSubscribes(payload = {}) {
    return axiosIntance.post(`/subscribes`, payload);
  },
  getSubscribesDeal(payload = {}) {
    return axiosIntance.post(`/subscribes/deals`, payload);
  },
};
