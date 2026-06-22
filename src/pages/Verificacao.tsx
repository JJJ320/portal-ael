import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { updateUser } from "../services/firestoreUser";

export default function Verificacao() {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleVerificar = async () => {
    const user = auth.currentUser;

    if (!user) {
      setErro("Usuário não autenticado");
      return;
    }

    let cargo: "aluno" | "lider" | "funcionario" | null = null;

    if (codigo === "7A-2026") cargo = "aluno";
    if (codigo === "LIDER-AEL") cargo = "lider";
    if (codigo === "ESCOLA-ADMIN") cargo = "funcionario";

    if (!cargo) {
      setErro("Código inválido");
      return;
    }

    await updateUser(user.uid, {
      cargo,
      verificado: true,
    });

    navigate("/home");
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

      <button onClick={handleVerificar}>
        Entrar
      </button>

      <p style={{ color: "red" }}>{erro}</p>
    </div>
  );
}