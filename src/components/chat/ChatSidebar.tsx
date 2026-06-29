import "../../styles/chat.css";

export default function ChatSidebar() {
  return (
    <aside className="chat-sidebar">

      <div className="member-group">
        <h4>ONLINE — 3</h4>

        <div className="member">
          <img
            src="https://cdn.discordapp.com/embed/avatars/0.png"
            alt=""
          />

          <span>João Gabriel</span>

          <div className="status online"></div>
        </div>

        <div className="member">
          <img
            src="https://cdn.discordapp.com/embed/avatars/1.png"
            alt=""
          />

          <span>Líder AEL</span>

          <div className="status online"></div>
        </div>

        <div className="member">
          <img
            src="https://cdn.discordapp.com/embed/avatars/2.png"
            alt=""
          />

          <span>Funcionário</span>

          <div className="status away"></div>
        </div>
      </div>

      <div className="member-group">
        <h4>OFFLINE — 2</h4>

        <div className="member offline">
          <img
            src="https://cdn.discordapp.com/embed/avatars/3.png"
            alt=""
          />

          <span>Aluno 1</span>

          <div className="status offline"></div>
        </div>

        <div className="member offline">
          <img
            src="https://cdn.discordapp.com/embed/avatars/4.png"
            alt=""
          />

          <span>Aluno 2</span>

          <div className="status offline"></div>
        </div>
      </div>

    </aside>
  );
}