import { z } from 'zod'
import { signupSchema } from './signup.validator'

export const loginSchema = signupSchema.pick({ email: true, password: true })
export type LoginDTO = z.infer<typeof loginSchema>
