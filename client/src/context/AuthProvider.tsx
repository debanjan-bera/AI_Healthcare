import { useEffect, useState } from "react";
import { api } from "../utils";
import { AuthContext } from "./AuthContext";
import type { RegisterPayload, User, LoginPayload } from "../types/Auth.interface";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    let mounted = true;
    const initAuth = async () => {
      try {
        const res = await api.auth.me();

        if (mounted) {
          setUser(res.user);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
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


  const CreateAccount = async (data: RegisterPayload) => {
    try {
      setLoading(true);
      const res = await api.auth.createAccount(data);
      setUser(res.user);
      return res;
    } catch {
      setUser(null);
      throw new Error("CreateAccount failed");
    } finally {
      setLoading(false);
    }
  }

  const Login = async (data: LoginPayload) => {
    try {
      setLoading(true);
      const res = await api.auth.login(data);
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api.auth.logout();
    setUser(null);

  }

  return (
    <AuthContext.Provider value={{ user, loading, refreshAuth, CreateAccount, Login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
