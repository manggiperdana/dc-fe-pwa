import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
function PublicRoute() {
  const [cookie] = useCookies(["token"]);
  if (cookie.token) {
    return <Navigate to={`/`} replace />;
  } 
  return <Outlet/>
}

export default PublicRoute;
