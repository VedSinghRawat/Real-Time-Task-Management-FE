import { ZodError, ZodType } from 'zod'

export function createValidator<T extends ZodType>(schema: T) {
  return (value: unknown) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return schema.parse(value) as T['_output']
    } catch (error) {
      if (error instanceof ZodError) {
        const errs = error.issues.reduce<{
          [key in keyof T['_output']]?: string
        }>((curr, issue) => {
          const key = issue.path[0]
          if (key) curr[key.toString() as keyof T['_output']] = issue.message

          return curr
        }, {})

        throw errs
      }
      throw 'Some error occured'
    }
  }
}
