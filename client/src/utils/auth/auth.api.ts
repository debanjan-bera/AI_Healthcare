import { post, get } from "../apiMethod";
import type { LoginPayload, AuthResponse, RegisterPayload } from "../../types/Auth.interface";


const ROUTE = "auth"

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    return await post(`${ROUTE}/login`, payload) as AuthResponse;
};

export const createAccount = async (payload: RegisterPayload): Promise<Omit<AuthResponse, "user.role">> => {
    return await post(`${ROUTE}/register`, payload) as AuthResponse;
};

export const me = async (): Promise<AuthResponse> => {
    return await get(`${ROUTE}/me`) as AuthResponse
}

export const logout = async () => {
    return await post(`${ROUTE}/logout`, {})
}