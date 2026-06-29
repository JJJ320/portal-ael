import { useAuthContext } from "../context/AuthContext";
import Chat from "../components/chat/Chat";
import { Navigate } from "react-router-dom";

export default function ChatPage() {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Carregando...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Chat />;
}