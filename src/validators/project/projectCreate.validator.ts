import { z } from 'zod'

export const projectCreateSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1),
  public: z.boolean().optional(),
})
export type ProjectCreateDTO = z.infer<typeof projectCreateSchema>
