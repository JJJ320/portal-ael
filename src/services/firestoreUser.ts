import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

export type Cargo =
  | "aluno"
  | "lider"
  | "funcionario"
  | null;

export interface UserData {
  uid: string;
  nome: string;
  email: string;
  foto: string;
  bio: string;
  cargo: Cargo;
  verificado: boolean;
}

const usersCollection = collection(db, "users");

export async function createUser(user: UserData) {
  await setDoc(doc(usersCollection, user.uid), user);
}

export async function getUser(uid: string): Promise<UserData | null> {
  const snapshot = await getDoc(doc(usersCollection, uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserData;
}

export async function updateUser(
  uid: string,
  data: Partial<UserData>
) {
  await updateDoc(doc(usersCollection, uid), data);
}

export async function deleteUser(uid: string) {
  await deleteDoc(doc(usersCollection, uid));
}

export async function getAllUsers(): Promise<UserData[]> {
  const snapshot = await getDocs(usersCollection);

  return snapshot.docs.map((doc) => doc.data() as UserData);
}