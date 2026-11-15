import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHook";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();


  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    if (!user.profileCompleted) {
      return <Navigate to="/register/onboarding" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
