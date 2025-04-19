import axios from "axios";
import { logout } from "./authService";
const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      logout(); // clear tokens, user state, etc.
    }
    return Promise.reject(error);
  }
);

export default api;
