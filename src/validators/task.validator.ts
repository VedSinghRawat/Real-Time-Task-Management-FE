import { z } from 'zod'

export const taskCreateSchema = z.object({
  description: z.string().min(1),
  estimated_time: z.number().int().positive(),
  time_left: z.number().int().nonnegative(),
  type: z.enum(['todo', 'doing', 'done']).optional().default('todo'),
  position: z.number().int().positive(),
})
export type TaskCreateDTO = z.infer<typeof taskCreateSchema>

export const taskUpdateSchema = taskCreateSchema.partial()
export type TaskUpdateDTO = z.infer<typeof taskUpdateSchema>
