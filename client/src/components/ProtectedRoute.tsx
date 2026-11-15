import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/AuthHook";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isOnboardingRoute = location.pathname.startsWith('/register/onboarding');

  if (!user.profileCompleted && !isOnboardingRoute) {
    return <Navigate to="/register/onboarding" replace />;
  }

  if (user.profileCompleted && isOnboardingRoute) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;