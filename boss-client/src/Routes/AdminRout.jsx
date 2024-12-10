import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAdmin from "../useMenu/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminloading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminloading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRout;
