import { useState } from "react";
import { auth } from "../services/firebase";
import { updateUser } from "../services/firestoreUser";
import { uploadImage } from "../services/cloudinary";
import { useAuthContext } from "../context/AuthContext";

export default function UserMenu() {
  const { userData, refreshUser } = useAuthContext();

  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(userData?.nome || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!auth.currentUser) return;

    try {
      setLoading(true);

      let foto = userData?.foto || "";

      if (file) {
        foto = await uploadImage(file);
      }

      await updateUser(auth.currentUser.uid, {
        nome,
        bio,
        foto,
      });

      await refreshUser();
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* avatar */}
      <img
        src={userData?.foto}
        onClick={() => setOpen(!open)}
        style={styles.avatar}
      />

      {/* dropdown */}
      {open && (
        <div style={styles.menu}>
          <h3>Editar perfil</h3>

          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Biografia"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "absolute" as const,
    top: 10,
    right: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    cursor: "pointer",
  },
  menu: {
    position: "absolute" as const,
    right: 0,
    top: 50,
    background: "#1a1a2e",
    padding: 15,
    borderRadius: 10,
    width: 220,
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
  },
};