import axios from "axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

// STEP 1: Create axios instance with base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// STEP 2: Request Interceptor to attach accessToken
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ➡️ LOGIN
export const loginUser = async (data: LoginRequest) => {
  const response = await API.post<AuthResponse>("/api/auth/login", data);
  return response.data;
};

// ➡️ REGISTER
export const registerUser = async (data: RegisterRequest) => {
  const response = await API.post<AuthResponse>("/api/auth/register", data);
  return response.data;
};

// 👤 GET CURRENT USER
export const getMe = async () => {
  const response = await API.get("/api/auth/me");
  return response.data;
};

// 🔄 REFRESH TOKEN
export const refreshToken = async () => {
  const response = await API.post("/api/auth/refresh-token");
  return response.data;
};

// ⬅️ LOGOUT
export const logoutUser = async () => {
  const response = await API.post("/api/auth/logout");
  return response.data;
};

export default API;
