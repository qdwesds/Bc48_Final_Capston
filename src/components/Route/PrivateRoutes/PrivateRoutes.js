import { Navigate, Outlet } from "react-router-dom";
import { getLocal } from "../../../utils/localStorage";

const PrivateRoutes = () => {
  const userLocal = getLocal("user");
  return userLocal ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoutes;
