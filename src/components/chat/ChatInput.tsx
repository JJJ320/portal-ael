import { useState } from "react";
import { sendMessage } from "../../services/firestoreMessages";

export default function ChatInput() {
  const [texto, setTexto] = useState("");

  async function enviar() {
    if (!texto.trim()) return;

    await sendMessage({
      nome: "Aluno",
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