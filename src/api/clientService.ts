import { Doctor } from "../models/doctor";
import api from "./axios";

export const getDoctors = async () => {
  try {
    const response = await api.get("/client/group-by-specialty");
    console.log("response: ", response.data);
    return response.data as { specialty: string; doctors: Doctor[] }[];
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    throw error;
  }
};

export const getBalance = async (): Promise<number> => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  if (!user?.id) throw new Error("User not found");

  try {
    const response = await api.get<{ balance: number }>(
      `/client/${user.id}/balance`
    );
    return response.data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

export const saveBalance = async (balance: number): Promise<void> => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  if (!user?.id) throw new Error("User not found");
  await api.patch(`/client/${user.id}/balance`, {
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
