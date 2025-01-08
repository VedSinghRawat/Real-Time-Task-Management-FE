import { z } from 'zod'

export const signupSchema = z
  .object({
    username: z.string().min(1).max(24),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/.*[A-Z].*/, 'Password should contain atleast one capital alphabet (A-Z)')
      .regex(/.*\d.*/, 'Password should contain atleast one digit (0-9)')
      .regex(/.*[a-z].*/, 'Password should contain atleast one small alphabet (a-z)')
      .regex(/..*[!#$%&*+-./<=>?@^_|~].*/, 'Password should contain atleast one special character (!,#,$,%,&,*,+,-,<,=,>,?,@,^,_,|,~)'),
  })
  .required()
export type SignupDTO = z.infer<typeof signupSchema>

export const loginSchema = signupSchema.pick({ email: true, password: true })
export type LoginDTO = z.infer<typeof loginSchema>
