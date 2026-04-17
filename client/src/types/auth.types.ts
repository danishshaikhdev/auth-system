export interface User {
    id: number;
    name: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegiseterRequest {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

type Data = {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: Data;
}

export interface ErrorResponse {
    success: boolean;
    message: string;
}

export type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegiseterRequest) => Promise<void>;
    logout: () => Promise<void>;
};