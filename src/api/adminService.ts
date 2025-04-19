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
