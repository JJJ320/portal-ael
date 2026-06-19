import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import type { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../services/firebase";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      setUser(result.user);

      console.log("Usuário logado:", result.user);

      // vai para a tela de código AEL
      navigate("/verificacao");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
        fontFamily: "Arial",
      }}
    >
      <h1>Portal AEL</h1>
      <p>Associação Estudantil Liberal</p>

      {!user ? (
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Entrar com Google
        </button>
      ) : (
        <div>
          <h3>Redirecionando...</h3>
        </div>
      )}
    </div>
  );
}