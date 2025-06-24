import { useNavigate } from "react-router-dom";
import { UserTypeEnum } from "../enums/user-type-enum";
import api from "./axios";

const getCurrentUser = () => {
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

export function useLogin() {
  const navigate = useNavigate();

  return (loggedInUser: {
    id: string;
    name: string;
    email: string;
    role: string;
  }) => {
    switch (loggedInUser.role) {
      case UserTypeEnum.ADMIN:
        navigate("/admin");
        break;
      case UserTypeEnum.DOCTOR:
        navigate("/doctor");
        break;
      case UserTypeEnum.CLIENT:
        navigate("/client/home", { state: { user: loggedInUser } });
        break;
      default:
        navigate("/login");
        break;
    }
  };
}

export const getHistory = async (): Promise<
  {
    clientId: string;
    doctorId: string;
    clientName: string;
    doctorName: string;
    createdAt: Date;
    endAt: Date;
  }[]
> => {
  const user = getCurrentUser();
  if (!user?.id) throw new Error("User not found");

  try {
    if (user.role !== "admin") {
      const response = await api.post("/chat/getByUserId", {
        userId: user.id,
        role: user.role,
      });
      return response.data as {
        clientId: string;
        doctorId: string;
        clientName: string;
        doctorName: string;
        createdAt: Date;
        endAt: Date;
      }[];
    } else {
      const response = await api.get("/chat/getAllChats");
      return response.data as {
        clientId: string;
        doctorId: string;
        clientName: string;
        doctorName: string;
        createdAt: Date;
        endAt: Date;
      }[];
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};
