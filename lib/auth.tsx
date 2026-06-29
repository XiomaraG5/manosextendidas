"use client";

// Contexto de autenticación con Google. Expone el usuario, si es admin
// autorizado, y las acciones de entrar/salir.
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { getClientAuth, googleProvider, isFirebaseConfigured } from "./firebase";
import { esAdmin } from "./admins";

type AuthState = {
  user: User | null;
  cargando: boolean;
  esAdmin: boolean;
  configurado: boolean;
  entrar: () => Promise<void>;
  salir: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setCargando(false);
      return;
    }
    const unsub = onAuthStateChanged(getClientAuth(), (u) => {
      setUser(u);
      setCargando(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      cargando,
      configurado: isFirebaseConfigured,
      esAdmin: esAdmin(user?.email),
      entrar: async () => {
        await signInWithPopup(getClientAuth(), googleProvider);
      },
      salir: async () => {
        await signOut(getClientAuth());
      },
    }),
    [user, cargando],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>.");
  return ctx;
}
