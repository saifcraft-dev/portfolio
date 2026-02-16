import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  Timestamp,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./config";
import type { Project, Service, Order, TeamMember } from "../../types";

// Projects CRUD
export const projectsApi = {
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  },
  getById: async (id: string) => {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Project) : null;
  },
  create: async (data: Omit<Project, 'id'>) => {
    return addDoc(collection(db, "projects"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  },
  update: async (id: string, data: Partial<Project>) => {
    const docRef = doc(db, "projects", id);
    return updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  },
  delete: async (id: string) => {
    return deleteDoc(doc(db, "projects", id));
  }
};

// Services CRUD
export const servicesApi = {
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, "services"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  },
  create: async (data: Omit<Service, 'id'>) => {
    return addDoc(collection(db, "services"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  }
};

// Orders CRUD
export const ordersApi = {
  create: async (data: Omit<Order, 'id'>) => {
    return addDoc(collection(db, "orders"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), status: 'pending' });
  },
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  }
};

// Team Members CRUD
export const teamApi = {
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, "team_members"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
  },
  create: async (data: Omit<TeamMember, 'id'>) => {
    return addDoc(collection(db, "team_members"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  },
  update: async (id: string, data: Partial<TeamMember>) => {
    const docRef = doc(db, "team_members", id);
    return updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  },
  delete: async (id: string) => {
    return deleteDoc(doc(db, "team_members", id));
  }
};
