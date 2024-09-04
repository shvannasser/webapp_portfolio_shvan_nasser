import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project, ProjectSchema } from "./types";
import fs from "node:fs/promises";
import { readFile } from "node:fs";
import path from "node:path";

const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

const projects: Project[] = [
  {
    id: "1",
    title: "Project 1",
    tags: ["tag1", "tag2"],
    description: "Description 1",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Project 2",
    tags: ["tag3", "tag4"],
    description: "Description 2",
    createdAt: new Date(),
  },
];

const dataFilePath = path.resolve("data.json");
// return all the projects
app.get(`/json`, async (c) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const dataAsJson = JSON.parse(data);
    return c.json(dataAsJson.projects);
  } catch (error) {
    return c.json({ error: "Failed to read data" }, { status: 500 });
  }
});

// write projects to data.json
app.post(`/api/add`, async (c) => {
  try {
    const newProject = await c.req.json();
    const project = ProjectSchema.parse(newProject);

    const jsonData = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(jsonData);

    data.projects.push(project);

    // Write to the file data.json
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    return c.json(data.projects, { status: 201 });
  } catch (error) {
    return c.json({ error: "Failed to add project" }, { status: 500 });
  }
});

// return all the projects
app.get(`/projects`, async (c) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const dataAsJson = JSON.parse(data);
    return c.json(dataAsJson.projects);
  } catch (error) {
    return c.json({ error: "Failed to read projects" }, { status: 500 });
  }
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
