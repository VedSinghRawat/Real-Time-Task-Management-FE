import { z } from 'zod'

export const signupSchema = z
  .object({
    username: z.string().min(1).max(24),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/.*[A-Z].*/)
      .regex(/.*\d.*/)
      .regex(/.*[a-z].*/)
      .regex(/..*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~].*/),
  })
  .required()

export type SignupDTO = z.infer<typeof signupSchema>
