import { FC, memo } from 'react'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Button'
import ROUTES from '../../../routes'
import NavLink from '../../UI/NavLink'
import useForm from '../../../hooks/useForm'
import { signupSchema } from '../../../validators/auth/signup.validator'
import { Store, useAppStore } from '../../../state/store'
import userSelectors from '../../../state/selector/user.selector'
import { useShallow } from 'zustand/shallow'

interface RegisterProps {}

const selectors = (state: Store) => ({
  loading: userSelectors.base.loading(state),
  signup: userSelectors.base.signup(state),
})

const Register: FC<RegisterProps> = () => {
  const { loading, signup } = useAppStore(useShallow(selectors))

  const { control, submitHandler } = useForm(signupSchema, signup, {
    username: '',
    email: '',
    password: '',
  })

  return (
    <>
      <h1 className={`text-2xl text-center sm:text-4xl lg:text-5xl`}>Register</h1>

      <p className={`mt-2 text-xs sm:mt-4 sm:text-base lg:text-lg`}>
        Already have an account. Click <NavLink to={ROUTES.login}>Here</NavLink> to login.
      </p>

      <form onSubmit={submitHandler} className={`flex flex-col gap-1 mt-8 text-sm sm:text-lg lg:text-xl`}>
        <Input control={control} name="username" type="text" placeholder="Your Username">
          Username
        </Input>

        <Input control={control} name="email" type="email" placeholder="Your Registered Email">
          Email
        </Input>

        <Input control={control} name="password" placeholder="Your Password" type="password">
          Password
        </Input>

        <Button className={`px-8 mx-auto mt-7 w-fit`} type="submit" isLoading={loading}>
          Submit
        </Button>
      </form>
    </>
  )
}

export default memo(Register)
