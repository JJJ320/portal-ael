import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { getUser } from "../services/firestoreUser";

export default function UserMenu() {
  const [userData, setUserData] = useState<any>(null);

  const user = auth.currentUser;

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      const data = await getUser(user.uid);
      setUserData(data);
    };

    load();
  }, [user]);

  if (!userData) return null;

  return (
    <div style={styles.container}>
      <img src={userData.foto} style={styles.avatar} />
      <div>
        <div>{userData.nome}</div>
        <small>{userData.cargo}</small>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "absolute",
    top: 10,
    right: 10,
    display: "flex",
    gap: 10,
    alignItems: "center",
    background: "#1e1f2b",
    padding: 8,
    borderRadius: 10,
    color: "white",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: "50%",
  },
};