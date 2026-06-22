import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { getUser } from "../services/firestoreUser";

export default function AuthGate() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      if (loading) return;

      if (!user) {
        navigate("/login");
        return;
      }

      const userData = await getUser(user.uid);

      if (!userData) {
        navigate("/login");
        return;
      }

      // 🔥 regra central
      if (!userData.cargo) {
        navigate("/verificacao");
        return;
      }

      navigate("/home");
    };

    check();
  }, [user, loading, navigate]);

  return (
    <h3 style={{ textAlign: "center", marginTop: "80px" }}>
      Carregando sistema...
    </h3>
  );
}