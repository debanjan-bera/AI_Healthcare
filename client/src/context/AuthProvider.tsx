import { useEffect, useState } from "react";
import { api } from "../utils";
import { AuthContext, type User } from "./AuthContext";
import type { LoginPayload } from "../utils/auth/auth.api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const res = await api.auth.me();
        if (isMounted) setUser(res.user);
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshAuth = async () => {
    setLoading(true);
    try {
      const res = await api.auth.me();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const Login = async (data: LoginPayload) => {
    try {
      setLoading(true);

      await api.auth.login(data); // just sets cookie

      await refreshAuth(); // call /me internally

    } catch {
      setUser(null);
    }finally{
      setLoading(false);
      
    }
  };

  const logout = async () => {
    await api.auth.logout();
    setUser(null);
    
  }

  return (
    <AuthContext.Provider value={{ user, loading, refreshAuth, Login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
