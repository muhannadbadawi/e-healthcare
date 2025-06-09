import { jwtDecode } from "jwt-decode";
import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { UserTypeEnum } from "../enums/user-type-enum";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role: UserTypeEnum;
}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  const decodedToken = jwtDecode<{
    id: string;
    email: string;
    role: UserTypeEnum;
  }>(token); // Decode the token to check expiration
  const userRole = decodedToken.role; // Assuming the role is stored in the token
  if (userRole !== role) {
    return <Navigate to="*" />;
  }

  return children;
};

export default ProtectedRoute;
