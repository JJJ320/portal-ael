import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Login() {
  const navigate = useNavigate();

  async function login() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/");
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Entrar com Google</button>
    </div>
  );
}