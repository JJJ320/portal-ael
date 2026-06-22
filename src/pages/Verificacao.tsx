import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { updateUser } from "../services/firestoreUser";

type Cargo = "aluno" | "lider" | "funcionario";

export default function Verificacao() {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const CODIGOS: Record<string, Cargo> = {
    "7A-2026": "aluno",
    "LIDER-AEL": "lider",
    "ESCOLA-ADMIN": "funcionario",
  };

  const handleVerificar = async () => {
    const user = auth.currentUser;

    if (!user) {
      setErro("Usuário não autenticado");
      return;
    }

    setLoading(true);
    setErro("");

    const cargo = CODIGOS[codigo]; // aqui já é Cargo | undefined

    if (!cargo) {
      setErro("Código inválido");
      setLoading(false);
      return;
    }

    try {
      await updateUser(user.uid, {
        cargo,
        verificado: true,
      });

      navigate("/home");
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar verificação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Verificação AEL</h1>

      <input
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Digite o código"
      />

      <br /><br />

      <button onClick={handleVerificar} disabled={loading}>
        {loading ? "Verificando..." : "Entrar"}
      </button>

      <p style={{ color: "red" }}>{erro}</p>
    </div>
  );
}