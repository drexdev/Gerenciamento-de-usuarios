import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/auth-context";

export default function PrivateLayout() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" />;
}
