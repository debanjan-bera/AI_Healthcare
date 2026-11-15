export type User = {
    id: string;
    name: string;
    mobile: number;
    role: string;
    profileCompleted: boolean;
} | null;

export interface LoginPayload {
    mobile: string;
    password: string;
}
export interface RegisterPayload extends LoginPayload {
    name: string
}
export interface AuthResponse {
    success: boolean;
    message: string;
    user: User;
}


