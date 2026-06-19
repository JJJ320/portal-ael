import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsrzFZBuVDIgHoX_uvQO11PKMFKz8IEnI",
  authDomain: "portal-ael.firebaseapp.com",
  projectId: "portal-ael",
  storageBucket: "portal-ael.firebasestorage.app",
  messagingSenderId: "940388244025",
  appId: "1:940388244025:web:39fc8bae8dc129deac8be8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// 🔥 PERSISTÊNCIA DO LOGIN (NÃO DESLOGA AO ATUALIZAR)
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
