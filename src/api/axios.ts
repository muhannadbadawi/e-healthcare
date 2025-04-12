// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000", // 👈 your backend URL
  withCredentials: true, // optional if using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors here (auth tokens, logging, etc.)

export default api;
