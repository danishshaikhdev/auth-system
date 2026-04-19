import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Loading } from "./Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    // ⏳ wait until auth check completes
    if (loading) {
        return <Loading />;
    }

    // ❌ not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ✅ logged in
    return children;
};

export default ProtectedRoute;