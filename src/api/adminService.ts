import { registerDoctorData } from "../models/register-doctor-data";
import api from "./axios";

export const getCounts = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Passwords do not match");
  }
  const response = await api.post(
    "/admin/getCounts",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const addDoctor = async (newDoctor: registerDoctorData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Passwords do not match");
  }
  const response = await api.post("/admin/addDoctor", newDoctor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.status === 201 ;
};

export const getDoctors = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Passwords do not match");
  }
  const response = await api.post(
    "/admin/getDoctors",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("response.data: ", response.data);

  return response.data;
};