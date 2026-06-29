import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export interface ChannelData {
  id?: string;
  nome: string;
  descricao: string;
  criadoEm?: any;
}

const channelsCollection = collection(db, "channels");

export async function createChannel(
  nome: string,
  descricao: string
) {
  await addDoc(channelsCollection, {
    nome,
    descricao,
    criadoEm: serverTimestamp(),
  });
}

export async function getChannels(): Promise<ChannelData[]> {
  const q = query(
    channelsCollection,
    orderBy("nome")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<ChannelData, "id">),
  }));
}