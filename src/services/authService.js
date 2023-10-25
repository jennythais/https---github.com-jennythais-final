import axiosIntance from "../utils/axiosInstance";

export const authService = {
  login(payload = {}) {
    return axiosIntance.post(`/customer/login`, payload);
  },
  register(payload = {}) {
    return axiosIntance.post(`/customer/register`, payload);
  },
  getProfile() {
    return axiosIntance.get(`/customer/profiles`);
  },
  getDataProvince() {
    return axiosIntance.get(`/provinces`);
  },
  getDataDistrict(id) {
    return axiosIntance.get(`/district?province=${id}`);
  },
  getDataWard(id) {
    return axiosIntance.get(`/wards?district=${id}`);
  },
  updateProfile(payload = {}) {
    return axiosIntance.put(`/customer/profiles`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getOrderMe() {
    return axiosIntance.get(`/orders/me`);
  },
  review(payload = {}) {
    return axiosIntance.post(`/reviews`, payload);
  },
};
