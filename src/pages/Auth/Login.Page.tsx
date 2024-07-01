import { FC, memo, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { LoginRequest } from '../../services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../validators/auth/login.validator'
import Input from '../../component/UI/Form/Input/Input'
import Button from '../../component/UI/Button'
import { ROUTES } from '../../routes'
import NavLink from '../../component/UI/NavLink'

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { register, handleSubmit } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = useMemo(() => handleSubmit((val) => console.log(val)), [handleSubmit])

  return (
    <div className={`grow flex flex-col items-center justify-center`}>
      <div className={`border-primary-4 text-primary-12 border bg-primary-2 bg-opacity-30 backdrop-blur-sm p-8 rounded-xl w-full max-w-md`}>
        <h1 className={`text-primary-12 text-center text-3xl`}>Login</h1>
        <p className={`text-sm mt-3 `}>
          Not Registered With Us. Click <NavLink to={ROUTES.REGISTER}>Here</NavLink> to register with us.
        </p>

        <form onSubmit={void onSubmit} className={`flex flex-col gap-3 mt-8 `}>
          <Input {...register('email')} placeholder="Your Registered Email">
            Email
          </Input>

          <Input {...register('password')} placeholder="Your Password" type="password">
            Password
          </Input>

          <Button className={`w-fit px-8 mx-auto mt-8`} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default memo(Login)
