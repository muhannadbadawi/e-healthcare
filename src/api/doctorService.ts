import api from "./axios";
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;
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
