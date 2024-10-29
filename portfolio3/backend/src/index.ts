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

// app.post("/api/projects", async (c) => {
//   const projects = await getProjectData()

//   const project = await c.req.json()
//   const projectWithId = { id: crypto.randomUUID(), ...project }
//   projects.push(projectWithId)
//   await updateProjectData(projects)
//   return c.json({ project: projectWithId }, 201)
// })

// app.get("/", async (c) => {
//   const data = await getProjectData()
//   return c.json({ data })
// })

// app.post("/api/projects", async (c) => {
//   const project = await c.req.json();
//   projects.push({ id: crypto.randomUUID(), ...project });
//   return c.json(projects);
// });

// app.get("/", (c) => {
//   return c.json(projects);
// });
