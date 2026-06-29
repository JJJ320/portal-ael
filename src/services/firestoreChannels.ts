import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export type Channel = {
  id?: string;
  name: string;
};

export function subscribeChannels(callback: (channels: Channel[]) => void) {
  const q = query(collection(db, "channels"), orderBy("name", "asc"));

  return onSnapshot(q, (snapshot) => {
    const channels = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Channel),
    }));

    callback(channels);
  });
}

export function createChannel(name: string) {
  return addDoc(collection(db, "channels"), {
    name,
  });
}