import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { serveStatic } from "@hono/node-server/serve-static"
import { z } from "zod"
import fs from "node:fs/promises"

const app = new Hono()

app.use("/*", cors())

app.use("/static/*", serveStatic({ root: "./" }))

// Define the Project schema using Zod
const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
})

type Project = z.infer<typeof ProjectSchema>

app.get(`/json`, async (c) => {
  const data = await fs.readFile("/data.json", "utf8")
  const dataAsJson = JSON.parse(data)
  return c.json(dataAsJson)
})

// write projects to data.json
app.post(`/json`, async (c) => {
  const data = await c.req.json()
  await fs.writeFile("/data.json", JSON.stringify(data))
  return c.json(data)
})

// return all the projects
app.get(`/projects`, async (c) => {
  const data = await fs.readFile("/data.json", "utf8")
  const dataAsJson = JSON.parse(data)
  return c.json(dataAsJson.projects)
})

// // Setter typen til habits til å være en array av Habit
// app.post("/add", async (c) => {
//   const newProject = await c.req.json()
//   // validate the received data is a valid Project
//   const projects = ProjectSchema.parse(newProject)
//   // check if project is a valid Project, and return an error message if not
//   if (!projects) return c.json({ error: "Invalid project" }, { status: 400 })
//   // Add the new project to the list of projects
//   projects.push(projects)
//   // return a list of all projects. Use a generic type to tell that we are returning an array of Project
//   return c.json<Project[]>(projects, { status: 201 })
// })

// app.get("/", (c) => {
//   // Returnerer en liste med alle habits. Bruker generisk type for å fortelle at vi returnerer en array av Habit
//   return c.json<Habit[]>(habits)
// })

const port = 3999

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
