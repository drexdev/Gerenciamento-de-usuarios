import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/auth-context";

export default function PublicLayout() {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" /> : <Outlet />;
}
