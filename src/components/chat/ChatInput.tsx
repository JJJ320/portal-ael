import { useState } from "react";
import { sendMessage } from "../../services/firestoreMessages";
import { useAuthContext } from "../../context/AuthContext";

export default function ChatInput() {
  const [texto, setTexto] = useState("");
  const { user } = useAuthContext();

  async function enviar() {
    if (!texto.trim()) return;
    if (!user) return;

    await sendMessage({
      nome: user.name || "Usuário",
      foto: "https://i.imgur.com/default.png",
      cargo: "Aluno",
      horario: Date.now(),
      texto,
      arquivo: "",
      tipo: "",
    });

    setTexto("");
  }

  return (
    <div className="chat-input">
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && enviar()}
        placeholder="Digite sua mensagem..."
      />

      <button onClick={enviar}>Enviar</button>
    </div>
  );
}