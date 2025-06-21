import { registerDoctorData } from "../models/register-doctor-data";
import api, { isSuccess } from "./axios";

export const getCounts = async () => {
  const response = await api.post("/admin/getCounts", {});
  return response.data;
};

export const addDoctor = async (newDoctor: registerDoctorData) => {
  const response = await api.post("/admin/addDoctor", newDoctor);
  return response.status === 201;
};

export const updateAdmin = async (
  id: string,
  data: {name: string; newPassword?: string, currentPassword: string}
) => {
  try {
    const response = await api.put(`/admin/editAdmin/${id}`, data);
    return isSuccess(response.status);
  } catch (error) {
    console.error("Error updating admin:", error);
    return false;
  }
};

export const updateDoctor = async (
  id: string,
  data: Partial<registerDoctorData>
) => {
  try {
    const response = await api.put(`/admin/editDoctor/${id}`, data);
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteDoctor = async (id: string) => {
  try {
    const response = await api.delete(`/admin/deleteDoctor/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteClient = async (id: string) => {
  try {
    const response = await api.delete(`/admin/deleteClient/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getDoctors = async () => {
  const response = await api.post("/admin/getDoctors", {});
  return response.data;
};

export const getClients = async () => {
  const response = await api.post("/admin/getClients", {});
  return response.data;
};

export const resetClientPassword = async (id: string) => {
  try {
    const response = await api.post(`/admin/resetClientPassword`, {id});
    return isSuccess(response.status);
  } catch (error) {
    console.error(error);
    return false;
  }
}