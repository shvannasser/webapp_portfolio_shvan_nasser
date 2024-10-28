import { addProject, fetchProjects } from "./project.service"
import { Context } from "hono"

export const getProjectsController = async (c: Context) => {
  const projects = await fetchProjects()
  return c.json({ data: projects })
}

export const createProjectController = async (c: Context) => {
  const projectData = await c.req.json()
  const newProject = await addProject(projectData)
  return c.json({ project: newProject }, 201)
}

// import { Hono } from "hono";
// import { projectService, type ProjectService } from "./project.service";
// import { validateQuery } from "../../lib/query";
// import { ErrorCode, errorResponse } from "../../lib/error";

// export const createProjectController = (projectService: ProjectService) => {
//   const app = new Hono();

//   app.get("/", async (c) => {
//     const query = validateQuery(c.req.query()).data ?? {};

//     const result = await projectService.list(query);

//     if (!result.success)
//       return errorResponse(
//         c,
//         result.error.code as ErrorCode,
//         result.error.message
//       );
//     return c.json(result);
//   });

//   app.get("/:id", async (c) => {
//     const id = c.req.param("id");
//     const result = await projectService.getById(id);

//     if (!result.success)
//       return errorResponse(
//         c,
//         result.error.code as ErrorCode,
//         result.error.message
//       );
//     return c.json(result);
//   });

//   app.post("/", async (c) => {
//     const data = await c.req.json();
//     const result = await projectService.create(data);
//     if (!result.success)
//       return errorResponse(
//         c,
//         result.error.code as ErrorCode,
//         result.error.message
//       );
//     return c.json(result, { status: 201 });
//   });

//   app.patch("/:id", async (c) => {
//     const id = c.req.param("id");
//     const data = await c.req.json();

//     const result = await projectService.update({ id, ...data });
//     if (!result.success)
//       return errorResponse(
//         c,
//         result.error.code as ErrorCode,
//         result.error.message
//       );
//     return c.json(result);
//   });

//   app.delete("/:id", async (c) => {
//     const id = c.req.param("id");
//     const result = await projectService.remove(id);
//     if (!result.success)
//       return errorResponse(
//         c,
//         result.error.code as ErrorCode,
//         result.error.message
//       );
//     return c.json(result);
//   });

//   return app;
// };

// export const projectController = createProjectController(projectService);
