import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function PrivateRoute() {
  const [cookie] = useCookies(["token"]);
  if (!cookie.token) {
    return <Navigate to={`/login`} replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;
