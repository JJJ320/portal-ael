import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsrzFZBuVDIgHoX_uvQO11PKMFKz8IEnI",
  authDomain: "portal-ael.firebaseapp.com",
  projectId: "portal-ael",
  storageBucket: "portal-ael.appspot.com",
  messagingSenderId: "940388244025",
  appId: "1:940388244025:web:39fc8bae8dc129deac8be8",
  measurementId: "G-DTL78WQ1PV",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// 🔥 ISSO AQUI QUE FALTAVA
export const provider = new GoogleAuthProvider();