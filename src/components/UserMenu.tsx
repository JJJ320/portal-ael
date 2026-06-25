import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  getUser,
  updateUser,
  type UserData,
} from "../services/firestoreUser";
import { uploadImage } from "../services/cloudinary";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);

  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [foto, setFoto] = useState("");

  const user = auth.currentUser;

  useEffect(() => {
    const loadUser = async () => {
      if (!user) return;

      const data = await getUser(user.uid);

      if (data) {
        setUserData(data);
        setNome(data.nome || "");
        setBio(data.bio || "");
        setFoto(data.foto || "");
      }
    };

    loadUser();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    await updateUser(user.uid, {
      nome,
      bio,
      foto,
    });

    setUserData((prev) =>
      prev
        ? {
            ...prev,
            nome,
            bio,
            foto,
          }
        : prev
    );

    setOpen(false);
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      setFoto(imageUrl);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar imagem");
    }
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {/* PERFIL VISÍVEL NO HEADER */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          background: "#2b2d31",
          padding: "6px 10px",
          borderRadius: "8px",
          minWidth: "220px",
        }}
      >
        <img
          src={
            foto ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Foto de perfil"
          title="Perfil"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              color: "white",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {nome || "Usuário"}
          </span>

          <span
            style={{
              color: "#b5bac1",
              fontSize: "12px",
            }}
          >
            {userData?.cargo || "Membro"}
          </span>
        </div>
      </div>

      {/* MENU */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: 0,
            width: "320px",
            background: "#313338",
            borderRadius: "12px",
            padding: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,.4)",
            zIndex: 9999,
            color: "white",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            <img
              src={
                foto ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Foto de perfil"
              title="Foto de perfil"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />

            <h3>{nome || "Usuário"}</h3>

            <p
              style={{
                color: "#b5bac1",
                fontSize: "13px",
              }}
            >
              {userData?.cargo || "Membro"}
            </p>
          </div>

          <label>Foto de Perfil</label>

          <input
            type="file"
            onChange={handleImageChange}
            style={{
              width: "100%",
              marginTop: "5px",
              marginBottom: "12px",
            }}
          />

          <label>Nome</label>

          <input
            type="text"
            value={nome}
            placeholder="Seu nome"
            onChange={(e) => setNome(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              marginTop: "5px",
              marginBottom: "12px",
            }}
          />

          <label>Biografia</label>

          <textarea
            value={bio}
            placeholder="Conte um pouco sobre você..."
            onChange={(e) => setBio(e.target.value)}
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              marginTop: "5px",
              marginBottom: "12px",
              resize: "vertical",
            }}
          />

          <button
            onClick={handleSave}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              background: "#5865f2",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Salvar Alterações
          </button>
        </div>
      )}
    </div>
  );
}