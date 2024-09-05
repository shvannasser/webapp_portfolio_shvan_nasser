import { z } from "zod"

// Definerer et Zod-skjema for Habit
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
})

// Definerer et Zod-skjema for å opprette en ny Habit
export const ProjectCreateSchema = ProjectSchema.omit({ id: true })

// Definerer et Zod-skjema for en array av Habit
export const ProjectArraySchema = z.array(ProjectSchema)

// Oppdatert type-definisjon basert på Zod-skjemaet
export type Project = z.infer<typeof ProjectSchema>

// Oppdatert type-definisjon basert på Zod-skjemaet
export type CreateProject = z.infer<typeof ProjectCreateSchema>

// export type Projects = {
//   id?: string;
//   title: string;
//   description?: string;
// };
