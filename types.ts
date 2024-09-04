import { z } from "zod";

// Definerer et zod-skjema for projsket
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  createdAt: z.coerce.date(),
});

// Definerer et zod-skjema for å opprette en ny projsket
export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

// Definerer et Zod-skjema for en array av prosjekter
export const ProjectsSchema = z.array(ProjectSchema);

// Oppdatert type-definisjon basert på zod-skjemaet
export type Project = z.infer<typeof ProjectSchema>;

// Oppdatert type-definisjon basert på zod-skjemaet
export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
