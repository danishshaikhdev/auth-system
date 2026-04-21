import {
  useEffect,
  useState,
} from "react";
import {
  loginUser as loginApi,
  registerUser as registerApi,
  logoutUser as logoutApi,
  refreshToken,
  getMe,
} from "../api/auth";
import type {
  LoginRequest,
  RegisterRequest,
  User,
  AuthProviderProps,
} from "../types/auth.types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // STEP 1: Initialize state from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      try {

        // check if token exists
        const accessToken = localStorage.getItem("accessToken");

        // if no token, jump to catch block
        if (!accessToken) throw new Error("No token");

        // if token exists, try to get user info
        // if success, set user state
        const userResponse = await getMe();
        setUser(userResponse.data);
      } catch {
        try {
          // if getMe failed, try to refresh token
          // if success, set user state
          const refreshTokenResponse = await refreshToken();

          if (refreshTokenResponse.success && refreshTokenResponse.data) {
            const newAccessToken = refreshTokenResponse.data.accessToken;

            // Save new access token to localStorage
            localStorage.setItem("accessToken", newAccessToken);

            // Retry getMe with new access token
            // if success, set user state
            const userResponse = await getMe();
            setUser(userResponse.data);
          } else {
            // if refresh token failed, jump to catch block
            throw new Error("Refresh failed");
          }
        } catch {
          // if refresh token failed, clear states and localStorage
          localStorage.removeItem("accessToken");
          setUser(null);
          setToken(null);
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // STEP 2: Enhanced Login Logic
  const login = async (data: LoginRequest) => {
    try {
      const res = await loginApi(data);

      localStorage.setItem("accessToken", res.data.accessToken);
      setUser(res.data.user);
      setToken(res.data.accessToken);

    } catch (err) {
      const message = err?.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  };

  // STEP 3: Register Logic
  const register = async (data: RegisterRequest) => {
    try {
      const res = await registerApi(data);
      if (!res.success) {
        throw new Error(res.message || "Registration failed");
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed";
      throw new Error(message);
    }
  };

  // STEP 4: Logout Logic
  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      // - Always clear local state even if API fails
      localStorage.removeItem("accessToken");
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
