import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Loading } from "./Loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};