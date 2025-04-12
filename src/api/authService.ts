// src/api/authService.ts
import { jwtDecode } from "jwt-decode";
import api from "./axios";

export const login = async (
  email: string,
  password: string
): Promise<{
  id: string;
  email: string;
  role: string;
}> => {
  const response = await api.post<{ token: string }>("/login", {
    email,
    password,
  });

  if (response.status === 201) {
    localStorage.setItem("token", response.data.token); // Save the token in local storage
    const userInfo = jwtDecode<{ id: string; email: string; role: string }>(
      response.data.token
    );
    return userInfo; // Return user info for further use
  } else {
    console.error("Login failed:", response.statusText);
    alert("Login failed: " + response.statusText);
    throw new Error("Login failed");
  }
};

export const register = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/register", userData);
  return response.data;
};
