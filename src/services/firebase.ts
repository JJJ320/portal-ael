import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

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

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const analytics = getAnalytics(app);