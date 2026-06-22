import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { updateUser } from "../services/firestoreUser";

export default function Verificacao() {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const CODIGOS = {
    "7A-2026": "aluno",
    "LIDER-AEL": "lider",
    "ESCOLA-ADMIN": "funcionario",
  } as const;

  const handleVerificar = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setErro("Usuário não autenticado");
        return;
      }

      const cargo =
        CODIGOS[codigo as keyof typeof CODIGOS];

      if (!cargo) {
        setErro("Código inválido");
        return;
      }

      await updateUser(user.uid, {
        cargo,
        verificado: true,
      });

      navigate("/home");
    } catch (err) {
      console.error(err);
      setErro("Erro ao verificar conta");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Verificação AEL</h1>

        <input
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Digite o código"
        />

        <button onClick={handleVerificar}>
          Entrar
        </button>

        {erro && <p style={{ color: "red" }}>{erro}</p>}
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
  },
};