import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, provider } from "../services/firebase";
import { createUser, getUser } from "../services/firestoreUser";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const existingUser = await getUser(user.uid);

      if (!existingUser) {
        await createUser({
          uid: user.uid,
          nome: user.displayName || "Usuário",
          email: user.email || "",
          foto: user.photoURL || "",
          bio: "",
          cargo: null,
          verificado: false,
        });
      }

      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Portal AEL</h1>
        <p>Sala digital da associação estudantil</p>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar com Google"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f0f1a",
    color: "white",
  },
  card: {
    padding: 40,
    background: "#1a1a2e",
    borderRadius: 12,
    textAlign: "center",
  },
};