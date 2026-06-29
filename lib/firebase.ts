// Inicialización única de Firebase (cliente y servidor).
// Las claves NEXT_PUBLIC_* son públicas por diseño: la seguridad real
// vive en firestore.rules y storage.rules, no en esconder estas claves.
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True solo si la config mínima está presente. Permite que el sitio
 *  funcione con contenido por defecto aunque Firebase no esté configurado. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

export const app: FirebaseApp | null = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const db: Firestore | null = app ? getFirestore(app) : null;

/** Auth y el proveedor de Google solo se usan en el navegador. */
export function getClientAuth(): Auth {
  if (!app) throw new Error("Firebase no está configurado.");
  return getAuth(app);
}

export const googleProvider = new GoogleAuthProvider();
