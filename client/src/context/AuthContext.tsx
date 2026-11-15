import { createContext } from 'react';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/Auth.interface';
import type { User } from '../types/Auth.interface';


type AuthContextType = {
  user: User;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  CreateAccount: (data: RegisterPayload) => Promise<Omit<AuthResponse, "user.role">>;
  Login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};


export const AuthContext = createContext<AuthContextType | null>(null);

