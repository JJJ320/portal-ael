import "../../styles/chat.css";

type Props = {
  channel: string;
};

const descriptions: Record<string, string> = {
  geral: "Converse com todos os membros da Associação Estudantil Liberal.",
  avisos: "Avisos importantes da equipe da AEL.",
  "7a": "Canal exclusivo da turma do 7º A.",
  lideres: "Canal reservado aos líderes.",
};

export default function ChatHeader({ channel }: Props) {
  const title =
    channel === "7a"
      ? "7º A"
      : channel.charAt(0).toUpperCase() + channel.slice(1);

  return (
    <header className="chat-header">

      <div className="chat-header-left">

        <span className="chat-hash">#</span>

        <div>

          <h2>{title}</h2>

          <p>
            {descriptions[channel] ?? "Canal do Portal AEL"}
          </p>

        </div>

      </div>

      <div className="chat-header-right">

        <button
          className="chat-header-button"
          title="Pesquisar"
        >
          🔍
        </button>

        <button
          className="chat-header-button"
          title="Membros"
        >
          👥
        </button>

        <button
          className="chat-header-button"
          title="Chamadas (em breve)"
        >
          📞
        </button>

      </div>

    </header>
  );
}