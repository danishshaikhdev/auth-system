import axios from "axios";
import type {
  AuthResponse,
  LoginRequest,
  RegiseterRequest,
} from "../types/auth.types";

// Base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // important for cookies (refresh token)
});

// ➡️ LOGIN
export const loginUser = async (data: LoginRequest) => {
  try {
    const response = await API.post<AuthResponse>("/api/auth/login", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Something went wrong" };
    }
    throw { message: "Something went wrong" };
  }
};

// ➡️ REGISTER
export const registerUser = async (data: RegiseterRequest) => {
  try {
    const response = await API.post<AuthResponse>("/api/auth/register", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Something went wrong" };
    }
    throw { message: "Something went wrong" };
  }
};

// 👤 GET CURRENT USER
export const getMe = async () => {
  try {
    const response = await API.get("/api/auth/me");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Unauthorized" };
    }
    throw { message: "Unauthorized" };
  }
};

// 🔄 REFRESH TOKEN
export const refreshToken = async () => {
  try {
    const response = await API.post("/api/auth/refresh-token");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Session expired" };
    }
    throw { message: "Session expired" };
  }
};

// ⬅️ LOGOUT
export const logoutUser = async () => {
  try {
    const response = await API.post("/api/auth/logout");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Logout failed" };
    }
    throw { message: "Logout failed" };
  }
};
