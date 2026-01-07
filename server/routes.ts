import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Client-side routing is handled by Vite/Wouter
  // API routes are handled directly via Firebase SDK in the client
  // detailed in client/src/lib/api.ts

  return httpServer;
}
