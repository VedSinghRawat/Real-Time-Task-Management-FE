import ROUTES from '../../../routes'
import Button from '../../UI/Button'
import Input from '../../UI/Form/Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { LoginRequest } from '../../../services/auth.service'
import { loginSchema } from '../../../validators/auth/login.validator'
import NavLink from '../../UI/NavLink'

const LoginForm = () => {
  const { handleSubmit, control } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = useMemo(() => handleSubmit((val) => console.log(val)), [handleSubmit])

  return (
    <>
      <h1 className={`text-2xl text-center text-primary-12 sm:text-4xl lg:text-5xl`}>Login</h1>
      <p className={`mt-3 text-xs sm:text-base lg:text-lg`}>
        Not Registered With Us. Click <NavLink to={ROUTES.register}>Here</NavLink> to register with us.
      </p>

      <form onSubmit={onSubmit} className={`flex flex-col gap-3 mt-8 text-sm sm:text-lg lg:text-xl`}>
        <Input control={control} name="email" placeholder="Your Registered Email">
          Email
        </Input>

        <Input control={control} name="password" placeholder="Your Password" type="password">
          Password
        </Input>

        <Button className={`px-8 mx-auto mt-8 w-fit`} type="submit">
          Submit
        </Button>
      </form>
    </>
  )
}

export default LoginForm
