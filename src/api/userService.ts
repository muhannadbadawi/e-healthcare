import { useNavigate } from "react-router-dom";
import { UserTypeEnum } from "../enums/user-type-enum";

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
