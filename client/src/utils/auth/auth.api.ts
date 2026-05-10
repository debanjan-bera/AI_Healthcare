import { post, get } from "../apiMethod";
import type { RegisterForm } from "../../types/Auth.interface";

export interface LoginPayload {
    mobile: string;
    password: string;
}

export interface AuthResponse {
    successful: boolean;
    message: string;
    user: {
        id: string;
        name: string;
        mobile: number;
        email: string;
        role: string;
    };
}

const ROUTE = "auth"

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  return await post(`${ROUTE}/login`, payload) as AuthResponse;
};

export const register = async (payload: RegisterForm): Promise<AuthResponse> => {
    // Map fullName to name for backend compatibility
    const backendPayload = {
        ...payload,
        name: payload.fullName,
        role: payload.role.toLowerCase() // Ensure role is lowercase for backend
    };
    return await post(`${ROUTE}/register`, backendPayload) as AuthResponse;
};

export const me = async (): Promise<AuthResponse>=>{
    return await get(`${ROUTE}/me`) as AuthResponse
}

export const logout = async ()=>{
return await post(`${ROUTE}/logout`, {})
}