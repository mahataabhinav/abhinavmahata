import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Messages
  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

// Seed function
export async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "E-Commerce Dashboard",
      description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      projectUrl: "https://example.com/dashboard",
      repoUrl: "https://github.com/example/dashboard",
      featured: true
    });
    
    await storage.createProject({
      title: "AI Chat Interface",
      description: "Modern chat application using OpenAI's GPT-4 API with streaming responses and history.",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      projectUrl: "https://example.com/chat",
      repoUrl: "https://github.com/example/chat",
      featured: true
    });

    await storage.createProject({
      title: "3D Product Configurator",
      description: "Interactive 3D product customization tool built with Three.js and React Fiber.",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      projectUrl: "https://example.com/3d-config",
      repoUrl: "https://github.com/example/3d-config",
      featured: false
    });
  }
}
