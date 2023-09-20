
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children }) => {
  const location = useLocation();
  const {isAuthenticated} = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;