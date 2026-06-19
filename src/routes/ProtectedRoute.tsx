import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getUserCargo } from "../services/userService";
import type { Cargo } from "../services/userService";
import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
  allowedRoles?: Cargo[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const { user, loading } = useAuth();
  const cargo = getUserCargo();

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Carregando...</h3>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!cargo) {
    return <Navigate to="/verificacao" />;
  }

  if (allowedRoles && !allowedRoles.includes(cargo)) {
    return <h3 style={{ textAlign: "center" }}>Acesso negado 🚫</h3>;
  }

  return children;
}