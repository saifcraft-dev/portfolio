import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "./config";

export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const signOut = () => {
  return firebaseSignOut(auth);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export const isAdmin = async (user: User | null): Promise<boolean> => {
  if (!user) return false;
  // For now, check against an environment variable or a simple logic
  // In a real app, you might check a 'users' collection or custom claims
  const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "").split(",");
  return adminEmails.includes(user.email || "");
};
