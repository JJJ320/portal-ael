import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getUser, type Cargo } from "../services/firestoreUser";

type Props = {
  children: ReactElement;
  allowedRoles?: Cargo[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, loading } = useAuthContext();
  const [cargo, setCargo] = useState<Cargo | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!user) {
        setChecking(false);
        return;
      }

      const data = await getUser(user.uid);

      setCargo(data?.cargo ?? null);
      setChecking(false);
    };

    if (!loading) {
      loadUser();
    }
  }, [user, loading]);

  if (loading || checking) {
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