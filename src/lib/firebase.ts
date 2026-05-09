import { initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "anyware-door.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "anyware-door",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "anyware-door.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

export function getFirebaseApp() {
  if (!isFirebaseConfigured) {
    throw new Error("Missing VITE_FIREBASE_API_KEY for the anyware-door Firebase project.");
  }

  app ??= initializeApp(firebaseConfig);
  return app;
}

export function getFirebaseAuth() {
  auth ??= getAuth(getFirebaseApp());
  return auth;
}

export function getFirebaseDb() {
  db ??= getFirestore(getFirebaseApp());
  return db;
}

export function getFirebaseStorage() {
  storage ??= getStorage(getFirebaseApp());
  return storage;
}

export const googleAuthProvider = new GoogleAuthProvider();
