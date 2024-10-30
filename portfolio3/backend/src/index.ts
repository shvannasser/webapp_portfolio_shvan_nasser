import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { port } from "./config";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
  updateProjectController,
} from "./features/projects/project.controller";

const app = new Hono();
app.use("/*", cors());

app.get("/api/projects", getProjectsController);
app.post("/api/projects", createProjectController);
app.patch("/api/projects/:id", updateProjectController);
app.delete("/api/projects/:id", deleteProjectController);

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
