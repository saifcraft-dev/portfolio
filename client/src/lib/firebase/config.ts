import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration using environment variables
// Using VITE_ prefix for Vite-based projects and NEXT_PUBLIC_ for compatibility with the prompt's request
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBc5sIREof9vnyOtFwmQ4LjWos7xs5yAjw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "my-portfolio-a7ea0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "my-portfolio-a7ea0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "my-portfolio-a7ea0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "813750536505",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:813750536505:web:e1580e6f9e67af1ccdc0e8",
};

// Initialize Firebase with error handling
let app;
try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization failed:", error);
  throw error;
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
