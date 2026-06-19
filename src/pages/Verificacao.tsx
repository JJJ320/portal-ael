import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserCargo } from "../services/userService";

export default function Verificacao() {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const CODIGO_ALUNO = "7A-2026";
  const CODIGO_LIDER = "LIDER-AEL";
  const CODIGO_FUNCIONARIO = "ESCOLA-ADMIN";

  const verificarCodigo = () => {
    if (codigo === CODIGO_ALUNO) {
      setUserCargo("aluno");
      navigate("/home");
      return;
    }

    if (codigo === CODIGO_LIDER) {
      setUserCargo("lider");
      navigate("/home");
      return;
    }

    if (codigo === CODIGO_FUNCIONARIO) {
      setUserCargo("funcionario");
      navigate("/home");
      return;
    }

    setErro("Código inválido");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Portal AEL</h1>
      <h3>Digite o código de acesso</h3>

      <input
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Ex: 7A-2026"
      />

      <br /><br />

      <button onClick={verificarCodigo}>
        Entrar
      </button>

      <p style={{ color: "red" }}>{erro}</p>
    </div>
  );
}