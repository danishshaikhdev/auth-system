import type { ReactNode } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
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

export type AuthProviderProps = {
    children: ReactNode;
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
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
};