import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { getUser, updateUser } from "../services/firestoreUser";

export default function Profile() {
  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [foto, setFoto] = useState("");

  const user = auth.currentUser;

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      const data = await getUser(user.uid);

      if (data) {
        setNome(data.nome || "");
        setBio(data.bio || "");
        setFoto(data.foto || "");
      }
    };

    load();
  }, [user]);

  const salvar = async () => {
    if (!user) return;

    await updateUser(user.uid, {
      nome,
      bio,
      foto,
    });

    alert("Perfil atualizado!");
  };

  return (
    <div style={styles.container}>
      <h2>Meu Perfil</h2>

      <img src={foto} style={styles.avatar} />

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="URL da foto"
        value={foto}
        onChange={(e) => setFoto(e.target.value)}
        style={styles.input}
      />

      <button onClick={salvar} style={styles.button}>
        Salvar
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: 40,
    color: "white",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    marginBottom: 10,
  },
  input: {
    display: "block",
    marginBottom: 10,
    padding: 10,
    width: 250,
  },
  button: {
    padding: 10,
    background: "#5865F2",
    color: "white",
    border: "none",
  },
};