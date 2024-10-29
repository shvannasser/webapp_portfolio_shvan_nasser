import type { Project } from "./project.schema";

const createId = () => crypto.randomUUID();

// Transforms a Project object to a simplified response format
export const createProjectResponse = (project: Project) => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    createdAt: project.createdAt,
    publishedAt: project.publishedAt,
    isPublic: project.isPublic,
    status: project.status,
  };
};

// Ensures required fields for creating a new project, assigning defaults if needed
export const createProject = (data: Partial<Project>): Project => {
  return {
    id: data.id ?? createId(),
    title: data.title ?? "",
    description: data.description ?? "",
    image: data.image ?? undefined,
    isPublic: data.isPublic ?? false,
    createdAt: data.createdAt ?? new Date().toISOString(),
    publishedAt: data.publishedAt ?? undefined,
    status: data.status ?? false,
  };
};

// Transforms a database Project object into a Project schema object
export const fromDb = (dbProject: any): Project => {
  return {
    id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description,
    image: dbProject.image ?? null,
    isPublic: dbProject.is_public ?? false,
    createdAt: new Date(dbProject.created_at).toISOString(),
    publishedAt: dbProject.published_at ?? null,
    status: dbProject.status ?? false,
  };
};

// Converts a Project object to the database format
export const toDb = (project: Project) => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    is_public: project.isPublic,
    created_at: project.createdAt,
    published_at: project.publishedAt,
    status: project.status,
  };
};
