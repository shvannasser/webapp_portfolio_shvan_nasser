import {
  addProject,
  fetchProjects,
  modifyProject,
  removeProject,
} from "./project.service";
import { Context } from "hono";

export const getProjectsController = async (c: Context) => {
  try {
    const projects = await fetchProjects();
    return c.json({ data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export const createProjectController = async (c: Context) => {
  try {
    const projectData = await c.req.json();
    const newProject = await addProject(projectData);
    return c.json({ project: newProject }, 201);
  } catch (error) {
    console.error("Error creating project:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export const updateProjectController = async (c: Context) => {
  try {
    const projectId = c.req.param("id");
    const projectData = await c.req.json();
    const updatedProject = await modifyProject(projectId, projectData);
    return c.json({ project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export const deleteProjectController = async (c: Context) => {
  try {
    const projectId = c.req.param("id");
    await removeProject(projectId);
    return c.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};
