import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type Cargo = "aluno" | "lider" | "funcionario";

export type UserData = {
  uid: string;
  nome: string;
  email: string;
  foto: string;
  bio: string;
  cargo: Cargo | null;
  verificado: boolean;
};

export async function createUser(data: UserData) {
  await setDoc(doc(db, "users", data.uid), data);
}

export async function getUser(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  return snap.exists() ? (snap.data() as UserData) : null;
}

export async function updateUser(uid: string, data: Partial<UserData>) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, data);
}