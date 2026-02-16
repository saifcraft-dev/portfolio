import { db } from "./db";
import { 
  projects, services, teamMembers, orders,
  type Project, type InsertProject, type UpdateProjectRequest,
  type Service, type InsertService, type UpdateServiceRequest,
  type TeamMember, type InsertTeamMember, type UpdateTeamMemberRequest,
  type Order, type InsertOrder, type UpdateOrderRequest
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: UpdateProjectRequest): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, updates: UpdateServiceRequest): Promise<Service>;
  deleteService(id: number): Promise<void>;

  // Team
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, updates: UpdateTeamMemberRequest): Promise<TeamMember>;
  deleteTeamMember(id: number): Promise<void>;

  // Orders
  getOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, updates: UpdateOrderRequest): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  // Projects
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: number, updates: UpdateProjectRequest): Promise<Project> {
    const [project] = await db.update(projects).set(updates).where(eq(projects.id, id)).returning();
    return project;
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }

  async updateService(id: number, updates: UpdateServiceRequest): Promise<Service> {
    const [service] = await db.update(services).set(updates).where(eq(services.id, id)).returning();
    return service;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Team
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const [member] = await db.insert(teamMembers).values(insertMember).returning();
    return member;
  }

  async updateTeamMember(id: number, updates: UpdateTeamMemberRequest): Promise<TeamMember> {
    const [member] = await db.update(teamMembers).set(updates).where(eq(teamMembers.id, id)).returning();
    return member;
  }

  async deleteTeamMember(id: number): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async updateOrder(id: number, updates: UpdateOrderRequest): Promise<Order> {
    const [order] = await db.update(orders).set(updates).where(eq(orders.id, id)).returning();
    return order;
  }
}

export const storage = new DatabaseStorage();
