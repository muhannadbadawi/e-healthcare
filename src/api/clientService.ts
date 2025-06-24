import { Doctor } from "../models/doctor";
import { registerClientData } from "../models/register-client-data";
import api from "./axios";

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

const getUserId = (): string => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  if (!user?.id) throw new Error("User ID not found in localStorage");
  return user.id;
};

export const updateClient = async (
  updatedClient: registerClientData
): Promise<registerClientData> => {
  try {
    const response = await api.put(
      `/client/updateClient/${getUserId()}`,
      updatedClient
    );
    return response.data as registerClientData;
  } catch (error) {
    console.error("Failed to update client:", error);
    throw error;
  }
};

export const getCurrentClient = async () => {
  try {
    const response = await api.get(`/client/getClientById/${getUserId()}`);
    return response.data as registerClientData;
  } catch (error) {
    console.error("Failed to fetch current client:", error);
    throw error;
  }
};

export const getDoctors = async () => {
  try {
    const response = await api.get("/client/group-by-specialty");
    return response.data as { specialty: string; doctors: Doctor[] }[];
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    throw error;
  }
};

export const getBalance = async (): Promise<number> => {
  if (!user?.id) throw new Error("User not found");

  try {
    const response = await api.get<{ balance: number }>(
      `/client/${getUserId()}/balance`
    );
    return response.data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

export const saveBalance = async (balance: number): Promise<void> => {
  if (!user?.id) throw new Error("User not found");
  await api.patch(`/client/${getUserId()}/balance`, {
    balance: balance,
  });
};

export const rateDoctor = async (
  doctorId: string,
  rating: number
): Promise<void> => {
  try {
    console.log("doctorId: ", doctorId);
    console.log("rating: ", rating);
    await api.post("/client/rateDoctor", {
      doctorId: doctorId,
      rating: rating,
    });
  } catch (error) {
    console.error("Error submitting rating:", error);
    // throw error;
  }
};
