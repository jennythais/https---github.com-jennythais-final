import axios from "axios";
import { BASE_URL } from "../constants/enviroments";
import tokenMethod from "./token";

const axiosIntance = axios.create({
  baseURL: BASE_URL,
});

axiosIntance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !!!originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { tokenData } = await axios.post("/refresh_token", {
          refreshToken: localStorage.getItem("refreshToken"),
        });
        tokenMethod.set(tokenData);
        originalRequest.headers.Authorization = `Bearer ${tokenData.token}`;
        return axiosIntance(originalRequest);
      } catch (error) {
        console.log("error", error);
        tokenMethod.remove();
      }
    }
    return Promise.reject(error);
  }
);

axiosIntance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosIntance;
