import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHook";
import Loading from "./Loading";


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;