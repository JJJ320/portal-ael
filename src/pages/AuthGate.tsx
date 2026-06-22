import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { getUser } from "../services/firestoreUser";

export default function AuthGate() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (loading) return;

      if (!user) {
        navigate("/login");
        return;
      }

      const dbUser = await getUser(user.uid);

      if (!dbUser) {
        navigate("/verificacao");
        return;
      }

      if (!dbUser.verificado) {
        navigate("/verificacao");
        return;
      }

      navigate("/home");
      setChecking(false);
    };

    check();
  }, [user, loading]);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Carregando Portal AEL...</h2>
    </div>
  );
}