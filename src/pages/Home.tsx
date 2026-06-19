import { getUserCargo } from "../services/userService";

export default function Home() {
  const cargo = getUserCargo();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🏫 Portal AEL</h1>

      <p>Bem-vindo ao sistema da Associação Estudantil Liberal</p>

      <hr />

      <h3>📌 Painel principal</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        
        <div style={cardStyle}>
          <h3>📅 Agenda</h3>
          <p>Ver atividades da turma</p>
        </div>

        <div style={cardStyle}>
          <h3>🗳️ Votações</h3>
          <p>Vote nas atividades da sala</p>
        </div>

        <div style={cardStyle}>
          <h3>💬 Chat</h3>
          <p>Converse com a turma</p>
        </div>

        <div style={cardStyle}>
          <h3>📢 Avisos</h3>
          <p>Comunicados importantes</p>
        </div>

        {cargo === "lider" || cargo === "funcionario" ? (
          <div style={cardStyle}>
            <h3>⚙️ Painel do Líder</h3>
            <p>Criar e gerenciar atividades</p>
          </div>
        ) : null}

      </div>

      <hr />

      <p>
        🔐 Cargo atual: <strong>{cargo}</strong>
      </p>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "10px",
  width: "200px",
  cursor: "pointer",
};