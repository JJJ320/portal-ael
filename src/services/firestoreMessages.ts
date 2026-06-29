import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export type Message = {
  nome: string;
  foto: string;
  cargo: string;
  horario: number;
  texto?: string;
  arquivo?: string;
  tipo?: string;
};

export function sendMessage(data: Message) {
  return addDoc(collection(db, "messages"), data);
}

export function subscribeMessages(callback: (messages: Message[]) => void) {
  const q = query(collection(db, "messages"), orderBy("horario", "asc"));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data() as Message);
    callback(messages);
  });
}