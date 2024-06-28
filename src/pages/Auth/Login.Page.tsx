import { FC, memo, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { LoginRequest } from '../../services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../validators/auth/login.validator'

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { register, handleSubmit } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = useMemo(() => handleSubmit((val) => console.log(val)), [handleSubmit])

  return (
    <div
      className={`border-secondary-4 border bg-secondary-2 bg-opacity-20 backdrop-blur-sm fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-8 rounded-xl`}
    >
      <h1 className={`text-primary-12`}>Login</h1>

      <form onSubmit={void onSubmit}>
        <input {...register('email')} />
        <input {...register('password')} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default memo(Login)
