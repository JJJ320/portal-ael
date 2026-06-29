import { useState } from "react";
import { sendMessage } from "../../services/firestoreMessages";
import { useAuthContext } from "../../context/AuthContext";

type Props = {
  channel: string;
};

export default function ChatInput({ channel }: Props) {
  const [texto, setTexto] = useState("");
  const { user } = useAuthContext();

  async function enviar() {
    if (!texto.trim() || !user) return;

    await sendMessage({
      nome: user.name || "Aluno",
      foto: "https://i.imgur.com/default.png",
      cargo: "Aluno",
      horario: Date.now(),
      texto,
      arquivo: "",
      tipo: "",
      channel,
    });

    setTexto("");
  }

  return (
    <div className="chat-input">
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && enviar()}
        placeholder={`Mensagem em #${channel}`}
      />

      <button onClick={enviar}>Enviar</button>
    </div>
  );
}