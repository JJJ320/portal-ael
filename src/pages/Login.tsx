import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, provider } from "../services/firebase";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("Usuário logado:", result.user);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h1>Portal AEL</h1>

      {!user ? (
        <button onClick={handleLogin}>
          Entrar com Google
        </button>
      ) : (
        <div>
          <img
            src={user.photoURL ?? ""}
            alt="Foto de perfil"
            width={120}
            height={120}
            style={{
              borderRadius: "50%",
            }}
          />

          <h2>{user.displayName}</h2>

          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}