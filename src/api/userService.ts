import { useNavigate } from "react-router-dom";
import { UserTypeEnum } from "../enums/user-type-enum";
import api from "./axios";

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

export function useLogin() {
  const navigate = useNavigate();

  return (user: any) => {
    if (user.role === UserTypeEnum.ADMIN) {
      navigate("/admin");
    } else if (user.role === UserTypeEnum.DOCTOR) {
      navigate("/doctor");
    } else if (user.role === UserTypeEnum.CLIENT) {
      navigate("/client/home", { state: { user } });
    }
  };
}

export const getHistory = async (): Promise<any[]> => {
  if (!user?.id) throw new Error("User not found");
  if (user.role !== "admin") {
    const requestData = { userId: user.id, role: user.role };
    const response = await api.post("/chat/getByUserId", requestData);
    console.log("response: ", response);
    return response.data;
  } else {
    const response = await api.get("/chat/getAllChats");
    console.log("response: ", response);
    return response.data;
  }
};
