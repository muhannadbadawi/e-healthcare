// src/api/authService.ts
import { jwtDecode } from "jwt-decode";
import api from "./axios";
import { registerClientData } from "../models/register-client-data";
import { UserTypeEnum } from "../enums/user-type-enum";
import toast from "react-hot-toast";

export const login = async (
  email: string,
  password: string
): Promise<{
  id: string;
  email: string;
  role: UserTypeEnum;
}> => {
  try {
    const response = await api.post<{
      access_token: string;
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }>("auth/login", {
      email,
      password,
    });

    if (response.status !== 201) {
      throw new Error("Login failed");
    }
    if (!response.data.access_token) {
      throw new Error("No access_token received");
    }

    localStorage.setItem("token", response.data.access_token); // Store the token in local storage
    localStorage.setItem("user", JSON.stringify(response.data.user)); // should be save in store

    // api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`; // Set the token in axios headers for future requests

    const token = response.data.access_token;

    const decodedToken = jwtDecode(token) as {
      id: string;
      email: string;
      role: UserTypeEnum;
    };

    return { ...decodedToken };
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Invalid email or password. Please try again.");
    throw new Error("Login failed");
  }
};

export const register = async (userData: registerClientData) => {
  const { confirmPassword, ...userDataWithoutConfirm } = userData;
  if (userData.password !== confirmPassword) {
    toast.error("Passwords do not match.");
    throw new Error("Passwords do not match");
  }
  const response = await api.post("auth/register", userDataWithoutConfirm);
  return response.data;
};

export const logout = () => {
  window.location.href = "/login";
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
