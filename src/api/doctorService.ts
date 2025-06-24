import { Doctor } from "../models/doctor";
import api from "./axios";
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

export const getDoctorInfo = async (): Promise<Doctor> => {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    throw new Error("User not found in localStorage");
  }

  const user = JSON.parse(userStr);

  if (!user?.id) {
    throw new Error("User ID is missing");
  }

  try {
    const response = await api.get(`/doctor/getById/${user.id}`);
    return response.data as Doctor;
  } catch (error) {
    console.error("Failed to fetch doctor info:", error);
    throw error;
  }
};

export const getSessionPrice = async (): Promise<number> => {
  try {
    const response = await api.get<{ sessionPrice: number }>(
      "/doctor/sessionPrice"
    );
    return response.data.sessionPrice;
  } catch (error) {
    console.error("Error fetching session price:", error);
    throw error;
  }
};

export const saveSessionPrice = async (price: number): Promise<void> => {
  if (!user?.id) throw new Error("User not found");

  await api.patch(`/doctor/${user.id}/session-price`, {
    sessionPrice: price,
  });
};
