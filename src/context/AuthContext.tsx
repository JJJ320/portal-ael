import {
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

import type { ReactNode } from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import type { User } from "firebase/auth";

import { auth } from "../services/firebase";

type UserData = {
  uid: string;
  email: string | null;
  name?: string | null;
};

type AuthContextType = {
  user: UserData | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (firebaseUser: User | null) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
          });
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}