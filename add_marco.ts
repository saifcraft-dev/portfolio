import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addMarco() {
  try {
    const docRef = await addDoc(collection(db, "team"), {
      name: "Marco Alvarez",
      role: "Full-Stack Web Developer",
      bio: "Marco builds end‑to‑end web applications, from database design to UI. He cares about clean architecture, scalable APIs, and maintainable code. He enjoys mentoring juniors and documenting everything so teams can move faster.",
      imageUrl: "/marco-alvarez.png",
      skills: ["JavaScript", "TypeScript", "Node.js", "Express.js", "Next.js", "REST & GraphQL APIs", "PostgreSQL", "MongoDB", "Redis", "Docker", "CI/CD", "Jest", "Playwright"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      },
      location: "Madrid, Spain",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Marco added with ID: ", docRef.id);
    process.exit(0);
  } catch (e) {
    console.error("Error adding Marco: ", e);
    process.exit(1);
  }
}

addMarco();
