// import { Hono } from "hono";
// import { validateQuery } from "../../lib/query";
// import { ErrorCode, errorResponse } from "../../lib/error";

// export const createProjectController = (projectService: ProjectService) => {
//   const app = new Hono();

//   app.get("/", async (c) => {
//     const query = validateQuery(c.req.query().data ?? {});

//     const result = await projectService.list(query);

//     if (!result.sucess) {
//       return errorResponse(
//         c,
//         result.error.code as ErrorCode,
//         result.error.message
//       );
//     }
//     return c.json(result);
//   });

//   return app;
// };

// export const projectController = createProjectController(projectService);
