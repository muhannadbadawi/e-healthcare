import axios from "axios";
import { logout } from "./authService";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔒 Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔁 Auto logout on 401 / 403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;
