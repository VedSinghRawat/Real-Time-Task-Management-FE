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
    <div className={`flex flex-col items-center justify-center grow`}>
      <div
        className={`w-full max-w-md px-8 py-5 border border-primary-4 text-primary-12 bg-primary-2 bg-opacity-30 backdrop-blur-sm sm:px-12 sm:py-9 rounded-xl sm:max-w-xl`}
      >
        <img src="/assets/img/logo.png" alt="logo" className={`w-full max-w-lg mx-auto`} />

        <h1 className={`text-2xl text-center text-primary-12 sm:text-4xl lg:text-5xl`}>Login</h1>
        <p className={`mt-3 text-xs sm:text-base lg:text-lg`}>
          Not Registered With Us. Click <NavLink to={ROUTES.REGISTER}>Here</NavLink> to register with us.
        </p>

        <form onSubmit={void onSubmit} className={`flex flex-col gap-3 mt-8 text-sm sm:text-lg lg:text-xl`}>
          <Input {...register('email')} placeholder="Your Registered Email">
            Email
          </Input>

          <Input {...register('password')} placeholder="Your Password" type="password">
            Password
          </Input>

          <Button className={`px-8 mx-auto mt-8 w-fit`} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default memo(Login)
