import {
  collection,
  addDoc,
  query,
 orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export interface MessageData {
  id?: string;

  canal: string;

  uid: string;

  nome: string;

  foto: string;

  texto: string;

  arquivo?: string;

  tipo?: string;

  criadoEm?: any;
}

export async function sendMessage(
  message: Omit<MessageData, "id" | "criadoEm">
) {
  await addDoc(collection(db, "messages"), {
    ...message,
    criadoEm: serverTimestamp(),
  });
}

export function listenMessages(
  canal: string,
  callback: (messages: MessageData[]) => void
) {
  const q = query(
    collection(db, "messages"),
    orderBy("criadoEm")
  );

  return onSnapshot(q, snapshot => {
    const messages = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<MessageData, "id">),
      }))
      .filter(msg => msg.canal === canal);

    callback(messages);
  });
}