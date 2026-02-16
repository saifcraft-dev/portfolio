export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  completedDate?: string;
  createdAt: any;
  updatedAt: any;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  pricing: string;
  deliveryTime: string;
  category: string;
  active: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface Order {
  id: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: any;
  updatedAt: any;
  notes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}
