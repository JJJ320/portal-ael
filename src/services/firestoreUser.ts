import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export type Cargo = "aluno" | "lider" | "funcionario";

export type UserData = {
  uid: string;
  nome: string;
  email: string;
  foto: string;
  cargo: Cargo | null;
  verificado: boolean;
};

// CRIAR USUÁRIO (login)
export async function createUser(data: UserData) {
  const ref = doc(db, "users", data.uid);

  await setDoc(ref, data);
}

// PEGAR USUÁRIO
export async function getUser(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  return snap.exists() ? (snap.data() as UserData) : null;
}

// ATUALIZAR USUÁRIO (SEM ERRO)
export async function updateUser(uid: string, data: Partial<UserData>) {
  const ref = doc(db, "users", uid);

  // cria se não existir, atualiza se existir
  await setDoc(ref, data, { merge: true });
}