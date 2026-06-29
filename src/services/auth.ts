import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth, provider } from "./firebase";

export async function loginGoogle() {
  return await signInWithPopup(auth, provider);
}

export async function logout() {
  await signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser;
}