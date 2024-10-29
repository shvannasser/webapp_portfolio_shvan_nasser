import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "./project.repository";
import type { Project } from "@prisma/client";

export const fetchProjects = async (): Promise<Project[]> => {
  return await getProjects();
};

export const addProject = async (projectData: {
  title: string;
  isPublic: boolean;
  status: boolean;
  publishedAt?: string;
  image?: string;
  description: string;
}): Promise<Project> => {
  return await createProject(projectData);
};

export const modifyProject = async (
  projectId: string,
  projectData: Partial<{
    title: string;
    isPublic: boolean;
    status: boolean;
    publishedAt?: string;
    image?: string;
    description: string;
  }>
): Promise<Project> => {
  return await updateProject(projectId, projectData);
};

export const removeProject = async (projectId: string): Promise<Project> => {
  return await deleteProject(projectId);
};
