import { createContext } from 'react';
import type { LoginPayload } from '../utils/auth/auth.api';

export type User = {
  id: string;
  name: string;
  email: string;
  mobile: number;
  role: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  Login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};


export const AuthContext = createContext<AuthContextType | null>(null);

