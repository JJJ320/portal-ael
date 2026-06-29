import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default function ChatInput() {
  const [texto, setTexto] = useState("");

  async function enviarMensagem() {
    if (!texto.trim()) return;

    await addDoc(collection(db, "messages"), {
      nome: "Aluno",
      foto: "https://i.imgur.com/default.png",
      cargo: "Aluno",
      horario: Date.now(),
      texto: texto,
      arquivo: "",
      tipo: ""
    });

    setTexto("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      enviarMensagem();
    }
  }

  return (
    <div className="chat-input">

      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={enviarMensagem}>
        Enviar
      </button>

    </div>
  );
}