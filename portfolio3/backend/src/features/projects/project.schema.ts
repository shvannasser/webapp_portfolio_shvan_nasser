import { z } from "zod";

// User schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(4),
});

// Project schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  image: z.string().optional(),
  description: z.string().min(1),
  isPublic: z.boolean().default(false),
  createdAt: z.string().optional(),
  status: z.boolean().default(false),
  authorId: z.string(),
  tags: z.array(z.string()).default([]),
  collaborators: z.array(z.string()).default([]),
});

// export const projectResponse = projectSchema.extend({
//   tags: z.array(z.object({ id: z.string(), name: z.string() })),
//   collaborators: z.array(z.object({ id: z.string(), name: z.string() })),
// });

export const updateProject = projectSchema.omit({
  createdAt: true,
});

export const createProject = projectSchema.omit({
  createdAt: true,
});

// Tag schema
export const tagSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
});

// ProjectTag schema for linking projects and tags
export const projectTagSchema = z.object({
  projectId: z.string(),
  tagId: z.string(),
});

// ProjectCollaborator schema for linking users and projects
export const projectCollaboratorSchema = z.object({
  userId: z.string(),
  projectId: z.string(),
  createdAt: z.string().optional(),
});

// Export types for usage in other modules
export type User = z.infer<typeof userSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Tag = z.infer<typeof tagSchema>;
export type ProjectTag = z.infer<typeof projectTagSchema>;
export type ProjectCollaborator = z.infer<typeof projectCollaboratorSchema>;
export type UpdateProject = z.infer<typeof updateProject>;
export type CreateProject = z.infer<typeof createProject>;
// export type ProjectResponse = z.infer<typeof projectResponse>;

// Validation functions

export const validateCreateProject = (data: unknown) => {
  return createProject.safeParse(data);
};

export const validateUpdateProject = (data: unknown) => {
  return updateProject.safeParse(data);
};

export const validateProject = (data: unknown) => {
  return projectSchema.safeParse(data);
};

export const validateUser = (data: unknown) => {
  return userSchema.safeParse(data);
};

export const validateTag = (data: unknown) => {
  return tagSchema.safeParse(data);
};

export const validateProjectCollaborator = (data: unknown) => {
  return projectCollaboratorSchema.safeParse(data);
};
