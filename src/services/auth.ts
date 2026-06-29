import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

export function loginWithGoogle() {
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}