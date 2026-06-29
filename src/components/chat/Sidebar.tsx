import "./../../styles/chat.css";

type Props = {
  channel: string;
  setChannel: (channel: string) => void;
};

const channels = [
  {
    id: "geral",
    nome: "geral",
  },
  {
    id: "avisos",
    nome: "avisos",
  },
  {
    id: "7a",
    nome: "7º A",
  },
  {
    id: "lideres",
    nome: "Líderes",
  },
];

export default function Sidebar({
  channel,
  setChannel,
}: Props) {
  return (
    <aside className="sidebar">

      <div className="server-title">
        Portal AEL
      </div>

      <div className="sidebar-category">
        CANAIS DE TEXTO
      </div>

      {channels.map((c) => (
        <button
          key={c.id}
          className={
            channel === c.id
              ? "channel active"
              : "channel"
          }
          onClick={() => setChannel(c.id)}
        >
          <span className="hash">#</span>

          {c.nome}
        </button>
      ))}

    </aside>
  );
}