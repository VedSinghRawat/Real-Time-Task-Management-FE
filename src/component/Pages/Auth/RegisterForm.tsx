import { FC, memo, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegisterRequest } from '../../../services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Button'
import ROUTES from '../../../routes'
import NavLink from '../../UI/NavLink'
import { signupSchema } from '../../../validators/auth/signup.validator'
import Form from '../../UI/Form/Form'

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const { handleSubmit, control } = useForm<RegisterRequest>({
    resolver: zodResolver(signupSchema),
    shouldFocusError: true,
    mode: 'onTouched',
  })
  const onSubmit = useCallback<SubmitHandler<RegisterRequest>>((vals) => {
    console.log(vals)
  }, [])

  return (
    <>
      <h1 className={`text-2xl text-center text-primary-12 sm:text-4xl lg:text-5xl`}>Register</h1>
      <p className={`sm:mt-4 mt-2 text-xs sm:text-base lg:text-lg`}>
        Already have an account. Click <NavLink to={ROUTES.login}>Here</NavLink> to login.
      </p>

      <Form onSubmit={void handleSubmit(onSubmit)} className={`flex flex-col gap-1 mt-8 text-sm sm:text-lg lg:text-xl`}>
        <Input control={control} name="username" type="text" placeholder="Your Username">
          Username
        </Input>

        <Input control={control} name="email" type="email" placeholder="Your Registered Email">
          Email
        </Input>

        <Input control={control} name="password" placeholder="Your Password" type="password">
          Password
        </Input>

        <Button className={`px-8 mx-auto mt-8 w-fit`} type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default memo(Register)
