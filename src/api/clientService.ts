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
