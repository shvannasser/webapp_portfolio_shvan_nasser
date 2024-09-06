import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { getProjectData, updateProjectData } from "./lib";
import { Project } from "./types";

const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

// return all the projects
app.get(`/`, async (c) => {
  const data = await getProjectData();
  return c.json({ data });
});

app.get("/:project", async (c) => {
  const reqProject = c.req.param("title") ?? "";

  const data = await getProjectData();
  const existing = data.find(
    (entry) => entry.title.toLowerCase() === reqProject.toLowerCase()
  );

  if (!existing) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json({ data: existing, param: reqProject });
});

app.post("/add", async (c) => {
  const body = await c.req.json<Project>();
  if (!body.title) {
    return c.json({ error: "Title is required" }, 400);
  }
  const data = await getProjectData();
  const hasTitle = data.some(
    (entry) => entry.title.toLowerCase() === body.title.toLowerCase()
  );
  if (hasTitle) return c.json({ error: "Project already exists" }, 409);
  data.push(body);
  await updateProjectData(data);
  return c.json({ body }, 201);
});

// app.post("/adds", async (c) => {
//   const data = await c.req.json<Project[]>()
//   const project = ProjectSchema.parse(data)

//   if (!project) return c.json({ error: "Invalid data" }, 400)
//   const projects = await getProjectData()
//   projects.push(project)
//   writeFile("projects.json", JSON.stringify(projects), (err) => {
//     if (err) {
//       console.error(err)
//       return c.json({ error: "Failed to add project" }, 500)
//     }
//   })

//   return c.json<Project[]>(projects, 201)
// })

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
