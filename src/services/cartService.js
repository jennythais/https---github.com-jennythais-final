import axiosIntance from "../utils/axiosInstance";

export const cartService = {
  getCart() {
    return axiosIntance.get(`/carts/me`);
  },
  updateCart(payload = {}) {
    return axiosIntance.put(`/carts`, payload);
  },
};
