import { port } from "/Config/config.ts";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getProjectData, updateProjectData } from "./lib";
import { Project } from "./types";

const app = new Hono();
app.use("/*", cors());

app.post("/api/projects", async (c) => {
  const projects = await getProjectData();

  const project = await c.req.json();
  const projectWithId = { id: crypto.randomUUID(), ...project };
  projects.push(projectWithId);
  await updateProjectData(projects);
  return c.json({ project: projectWithId }, 201);
});

app.get("/", async (c) => {
  const data = await getProjectData();
  return c.json({ data });
});

// app.post("/api/projects", async (c) => {
//   const project = await c.req.json();
//   projects.push({ id: crypto.randomUUID(), ...project });
//   return c.json(projects);
// });

// app.get("/", (c) => {
//   return c.json(projects);
// });

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
