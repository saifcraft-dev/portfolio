import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  type Unsubscribe
} from 'firebase/firestore';
import { db } from './config';
import { Project, Service, Order, TeamMember } from '@/types';

// Generic CRUD helper
const createCRUD = <T extends { id?: string }>(collectionName: string) => {
  const colRef = collection(db, collectionName);

  return {
    getAll: async (): Promise<T[]> => {
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    },
    getById: async (id: string): Promise<T | null> => {
      const docRef = doc(db, collectionName, id);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : null;
    },
    subscribeAll: (callback: (data: T[]) => void): Unsubscribe => {
      return onSnapshot(colRef, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
        callback(data);
      });
    },
    create: async (data: Omit<T, 'id'>): Promise<string> => {
      const docRef = await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    },
    update: async (id: string, data: Partial<T>): Promise<void> => {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    },
    delete: async (id: string): Promise<void> => {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    }
  };
};

export const projectsApi = createCRUD<Project>('projects');
export const servicesApi = createCRUD<Service>('services');
export const ordersApi = createCRUD<Order>('orders');
export const teamApi = createCRUD<TeamMember>('team');

// Local fallback for team if Firestore is empty/inaccessible
const localTeam: TeamMember[] = [
  {
    id: "marco-alvarez",
    name: "Marco Alvarez",
    role: "Full-Stack Web Developer",
    bio: "Marco builds end‑to‑end web applications, from database design to UI. He cares about clean architecture, scalable APIs, and maintainable code. He enjoys mentoring juniors and documenting everything so teams can move faster.",
    imageUrl: "/marco-alvarez.png",
    skills: ["JavaScript", "TypeScript", "Node.js", "Express.js", "Next.js", "REST & GraphQL APIs", "PostgreSQL", "MongoDB", "Redis", "Docker", "CI/CD", "Jest", "Playwright"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  }
];

export const getTeamWithFallback = async (): Promise<TeamMember[]> => {
  try {
    const members = await teamApi.getAll();
    if (members.length > 0) return members;
    return localTeam;
  } catch (error) {
    console.error("Error fetching team, using fallback:", error);
    return localTeam;
  }
};

// Special queries
export const getFeaturedProjects = async (): Promise<Project[]> => {
  const q = query(collection(db, 'projects'), where('featured', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const getActiveServices = async (): Promise<Service[]> => {
  const q = query(collection(db, 'services'), where('active', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
};
