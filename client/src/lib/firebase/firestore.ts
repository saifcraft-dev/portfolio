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
import naomiImg from "@assets/ChatGPT_Image_Feb_19,_2026,_09_32_33_AM_1771475827794.png";
import fullStackImg from "@assets/image_1771476086345.png";

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

// Local fallback for services if Firestore is empty/inaccessible
const localServices: Service[] = [
  {
    id: "full-stack-web-development",
    title: "Full Stack Web Development",
    description: "Comprehensive digital solutions tailored to help your business grow. We handle everything from design to deployment.",
    features: [
      "Custom Web Applications",
      "Responsive UI/UX Design",
      "Robust Backend Systems",
      "Database Integration",
      "API Development",
      "Deployment & Hosting"
    ],
    pricing: "Starting at $2,500",
    deliveryTime: "4-8 weeks",
    category: "Development",
    active: true
  }
];

// Local fallback for team if Firestore is empty/inaccessible
const localTeam: TeamMember[] = [
  {
    id: "naomi-okafor",
    name: "Naomi Okafor",
    role: "Backend & DevOps Web Developer",
    bio: "Naomi specializes in building reliable, secure backend services and deployment pipelines. She focuses on API design, database optimization, and observability (logs, metrics, tracing). She enjoys automating repetitive tasks and making deployments boring and predictable.",
    imageUrl: naomiImg,
    skills: ["Node.js", "Python (FastAPI, Django)", "REST & GraphQL APIs", "WebSockets", "PostgreSQL", "MySQL", "Redis", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", "AWS"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  },
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
  },
  {
    id: "aisha-khan",
    name: "Aisha Khan",
    role: "Frontend Web Developer",
    bio: "Aisha is a frontend engineer focused on building smooth, accessible user interfaces. She loves transforming rough wireframes into pixel-perfect, responsive experiences and is obsessed with performance, micro-animations, and clean, reusable components.",
    imageUrl: "/aisha-khan.png",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma to React workflows", "Responsive Design", "Accessibility (WCAG)"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "lena-schmidt",
    name: "Lena Schmidt",
    role: "Web Developer & UI/UX Designer",
    bio: "Lena bridges design and development. She prototypes interfaces in Figma and then implements them as production‑ready components. She’s passionate about smooth micro‑interactions, inclusive design, and clear visual hierarchies.",
    imageUrl: "/lena-schmidt.png",
    skills: ["HTML", "CSS (Grid/Flexbox)", "JavaScript", "Vue.js", "Nuxt", "GSAP animations", "Figma", "Adobe XD", "Design Systems", "User Research", "Prototyping", "Usability Testing"],
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

export const getServicesWithFallback = async (): Promise<Service[]> => {
  try {
    const services = await servicesApi.getAll();
    if (services.length > 0) return services;
    return localServices;
  } catch (error) {
    console.error("Error fetching services, using fallback:", error);
    return localServices;
  }
};

// Special queries
export const getFeaturedProjects = async (): Promise<Project[]> => {
  const q = query(collection(db, 'projects'), where('featured', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const getActiveServices = async (): Promise<Service[]> => {
  try {
    const q = query(collection(db, 'services'), where('active', '==', true));
    const snapshot = await getDocs(q);
    if (snapshot.docs.length > 0) {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    }
    return localServices.filter(s => s.active);
  } catch (error) {
    console.error("Error fetching active services, using fallback:", error);
    return localServices.filter(s => s.active);
  }
};
