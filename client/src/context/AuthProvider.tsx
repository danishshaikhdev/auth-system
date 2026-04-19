import { useEffect, useState, type ReactNode } from "react";
import { getMe, loginUser, logoutUser, refreshToken, registerUser } from "../api/auth";
import type { LoginRequest, RegiseterRequest, User } from "../types/auth.types";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // create state variables
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // try auto login on reload
    useEffect(() => {
        const initAuth = async () => {
            try {
                // try to get a new token from the server
                // if the token is valid, set it to the state
                const resToken = await refreshToken();
                setToken(resToken.data.accessToken);

                // get the user data by the new token
                const userData = await getMe();
                setUser(userData);
            } catch {
                // if the token is not valid, set the user to null and the token to null
                setUser(null);
                setToken(null);
            } finally {
                setLoading(false);
            };
        };

        initAuth();
    }, []);

    // 🔐 LOGIN
    const login = async (data: LoginRequest) => {
        setLoading(true);
        try {
            const res = await loginUser(data);
            setToken(res.data.accessToken);
            setUser(res.data.user);
        } finally {
            setLoading(false);
        }
    };

    // 📝 REGISTER
    const register = async (data: RegiseterRequest) => {
        await registerUser(data);
    };

    // 🚪 LOGOUT
    const logout = async () => {
        await logoutUser();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};