import { z } from "zod";

// Project schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  image: z.string().optional(),
  description: z.string().min(1),
  isPublic: z.boolean().default(false),
  createdAt: z.string(),
  publishedAt: z.string().optional(),
  status: z.boolean().default(false),
});

export const updateProject = projectSchema.omit({
  id: true,
  createdAt: true,
});

export const createProject = projectSchema.omit({
  id: true,
  createdAt: true,
});

// Export types for usage in other modules
export type Project = z.infer<typeof projectSchema>;
export type UpdateProject = z.infer<typeof updateProject>;
export type CreateProject = z.infer<typeof createProject>;
