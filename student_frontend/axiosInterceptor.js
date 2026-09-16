import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api"
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("loginToken");

    if (accessToken) {
      config.headers.token = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;