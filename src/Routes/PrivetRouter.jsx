import { useContext } from "react";
import { AuthContext } from "../Context-Provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivetRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>waiting</h1>;
  }
  if (user?.email) {
    return children;
  }
  return <Navigate to="/login" replace></Navigate>;
};

export default PrivetRouter;
