import "../../styles/chat.css";

export interface MessageProps {
  nome: string;
  foto: string;
  cargo: string;
  horario: number;
  texto?: string;
  arquivo?: string;
  tipo?: string;
}

export default function Message({
  nome,
  foto,
  cargo,
  horario,
  texto,
  arquivo,
  tipo,
}: MessageProps) {
  return (
    <div className="message">
      <img src={foto} alt={nome} className="message-avatar" />

      <div className="message-content">
        <div className="message-top">
          <span className="message-name">{nome}</span>

          <span className={`cargo cargo-${cargo.toLowerCase()}`}>
            {cargo}
          </span>

          <span className="message-time">
            {new Date(horario).toLocaleTimeString()}
          </span>
        </div>

        {texto && <div className="message-text">{texto}</div>}

        {arquivo && tipo === "image" && (
          <img src={arquivo} className="message-image" />
        )}

        {arquivo && tipo === "video" && (
          <video controls className="message-video">
            <source src={arquivo} />
          </video>
        )}

        {arquivo && tipo === "audio" && (
          <audio controls className="message-audio">
            <source src={arquivo} />
          </audio>
        )}

        {arquivo &&
          !["image", "video", "audio"].includes(tipo || "") && (
            <a
              href={arquivo}
              target="_blank"
              rel="noreferrer"
              className="message-file"
            >
              📄 Abrir arquivo
            </a>
          )}
      </div>
    </div>
  );
}