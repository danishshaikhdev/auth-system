import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
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
  AuthContextType,
} from "../types/auth.types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // STEP 1: Initialize state from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) throw new Error("No token");

        // Try with existing token
        const userRes = await getMe();
        setUser(userRes.data);
      } catch {
        try {
          // 🔥 Token expired → try refresh
          const refreshRes = await refreshToken();

          if (refreshRes.success && refreshRes.data) {
            const newAccessToken = refreshRes.data.accessToken;

            // Save new token
            localStorage.setItem("accessToken", newAccessToken);

            // Retry getMe with new token
            const userRes = await getMe();
            setUser(userRes.data);
          } else {
            throw new Error("Refresh failed");
          }
        } catch {
          // ❌ Both failed → logout
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
