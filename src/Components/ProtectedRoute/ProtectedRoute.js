
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({children }) => {
  const location = useLocation();
  const {isAuthenticated} = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  

  // const isLoggedIn = () => {
  //   if (!token) {
  //     return false;
  //   }
  //   const decodedToken = jwt_decode(token);
  //   const currentTime = new Date().getTime() / 1000;
  //   return decodedToken.exp > currentTime;
  // };
  

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;