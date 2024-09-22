import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getProjectData, updateProjectData } from "./lib";
import { Project } from "./types";

const app = new Hono();
app.use("/*", cors());

// const projects = [
//   {
//     id: "e2566083-d1d6-46b7-a875-db8689979b4b",
//     title: "Project 1",
//     description:
//       "This project focuses on the advanced features and capabilities of HTML5, including multimedia integration, enhanced form controls, and improved semantic elements. It aims to demonstrate how HTML5 can be used to create modern, responsive, and accessible web applications.",
//   },
//   {
//     id: "c2749627-254f-43b7-b779-a1de26bb4314",
//     title: "Project 2",
//     description:
//       "The project explores the innovative aspects of HTML5, such as its support for audio and video elements, canvas for drawing graphics, and new APIs for offline storage and geolocation. It showcases practical examples and best practices for leveraging HTML5 to build dynamic and interactive web experiences.",
//   },
//   {
//     id: "666b9a03-bed9-4ab2-b619-b6adfbabdddc",
//     title: "Project 3",
//     description:
//       "This project focuses on the advanced features and capabilities of HTML5.",
//   },
// ];

let projects: Project[] = [];

getProjectData()
  .then((loadedProjects) => {
    projects = loadedProjects;
    console.log("Projects loaded:", projects);
  })
  .catch((error) => {
    console.error("Error loading projects:", error);
  });

app.post("/api/projects", async (c) => {
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

const port = 3999;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
