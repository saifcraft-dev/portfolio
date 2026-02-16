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
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { Project, Service, Order, TeamMember } from '../types';

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
