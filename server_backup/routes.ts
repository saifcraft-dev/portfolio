import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === Projects Routes ===
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.put(api.projects.update.path, async (req, res) => {
    try {
      const input = api.projects.update.input.parse(req.body);
      const project = await storage.updateProject(Number(req.params.id), input);
      res.json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(404).json({ message: "Project not found" });
    }
  });

  app.delete(api.projects.delete.path, async (req, res) => {
    await storage.deleteProject(Number(req.params.id));
    res.status(204).send();
  });

  // === Services Routes ===
  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get(api.services.get.path, async (req, res) => {
    const service = await storage.getService(Number(req.params.id));
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  });

  app.post(api.services.create.path, async (req, res) => {
    try {
      const input = api.services.create.input.parse(req.body);
      const service = await storage.createService(input);
      res.status(201).json(service);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.put(api.services.update.path, async (req, res) => {
    try {
      const input = api.services.update.input.parse(req.body);
      const service = await storage.updateService(Number(req.params.id), input);
      res.json(service);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(404).json({ message: "Service not found" });
    }
  });

  app.delete(api.services.delete.path, async (req, res) => {
    await storage.deleteService(Number(req.params.id));
    res.status(204).send();
  });

  // === Team Routes ===
  app.get(api.team.list.path, async (req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  app.post(api.team.create.path, async (req, res) => {
    try {
      const input = api.team.create.input.parse(req.body);
      const member = await storage.createTeamMember(input);
      res.status(201).json(member);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.put(api.team.update.path, async (req, res) => {
    try {
      const input = api.team.update.input.parse(req.body);
      const member = await storage.updateTeamMember(Number(req.params.id), input);
      res.json(member);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(404).json({ message: "Team member not found" });
    }
  });

  app.delete(api.team.delete.path, async (req, res) => {
    await storage.deleteTeamMember(Number(req.params.id));
    res.status(204).send();
  });

  // === Orders Routes ===
  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.orders.list.path, async (req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  app.put(api.orders.update.path, async (req, res) => {
    try {
      const input = api.orders.update.input.parse(req.body);
      const order = await storage.updateOrder(Number(req.params.id), input);
      res.json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(404).json({ message: "Order not found" });
    }
  });

  // === Seed Data ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await storage.createService({
      title: "Web Development",
      description: "Full-stack web applications built with modern technologies.",
      pricing: "$1000+",
      deliveryTime: "2-4 weeks",
      category: "Web",
      active: true,
      features: ["Responsive Design", "SEO Optimization", "Admin Dashboard"]
    });
    await storage.createService({
      title: "Mobile App Development",
      description: "Native and cross-platform mobile apps for iOS and Android.",
      pricing: "$2000+",
      deliveryTime: "4-8 weeks",
      category: "Mobile",
      active: true,
      features: ["iOS & Android", "Push Notifications", "App Store Submission"]
    });
  }

  const existingTeam = await storage.getTeamMembers();
  if (existingTeam.length === 0) {
    await storage.createTeamMember({
      name: "Alex Johnson",
      role: "Lead Developer",
      bio: "Full-stack wizard with 10 years of experience.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      skills: ["React", "Node.js", "Python"],
      socialLinks: { twitter: "#", linkedin: "#" }
    });
  }

  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "E-Commerce Platform",
      description: "A comprehensive online store with payment processing.",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      category: "Web App",
      technologies: ["Next.js", "Stripe", "PostgreSQL"],
      featured: true
    });
    await storage.createProject({
      title: "Fitness Tracker App",
      description: "Mobile application for tracking workouts and nutrition.",
      imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop",
      category: "Mobile",
      technologies: ["React Native", "Firebase", "HealthKit"],
      featured: true
    });
  }
}
