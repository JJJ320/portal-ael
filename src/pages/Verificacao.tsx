import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { updateUser } from "../services/firestoreUser";

export default function Verificacao() {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const CODIGO_ALUNO = "7A-2026";
  const CODIGO_LIDER = "LIDER-AEL";
  const CODIGO_FUNCIONARIO = "ESCOLA-ADMIN";

  const handleVerificar = async () => {
    try {
      setLoading(true);
      setErro("");

      const user = auth.currentUser;

      if (!user) {
        setErro("Usuário não autenticado");
        return;
      }

      let cargo: "aluno" | "lider" | "funcionario" | null = null;

      if (codigo === CODIGO_ALUNO) cargo = "aluno";
      if (codigo === CODIGO_LIDER) cargo = "lider";
      if (codigo === CODIGO_FUNCIONARIO) cargo = "funcionario";

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
      setErro("Erro ao verificar usuário");
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