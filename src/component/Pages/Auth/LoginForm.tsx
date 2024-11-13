import ROUTES from '../../../routes'
import Button from '../../UI/Button'
import Input from '../../UI/Form/Input/Input'
import { loginSchema } from '../../../validators/auth/login.validator'
import NavLink from '../../UI/NavLink'
import userSelectors from '../../../state/selector/user.selector'
import { Store, useAppStore } from '../../../state/store'
import useForm from '../../../hooks/useForm'

const selectors = (state: Store) => ({
  loading: userSelectors.base.loading(state),
  login: userSelectors.base.login(state),
})

const LoginForm = () => {
  const { loading, login } = useAppStore(selectors)

  const { control, submitHandler } = useForm(loginSchema, login, {
    email: '',
    password: '',
  })

  return (
    <>
      <h1 className={`text-2xl text-center sm:text-4xl lg:text-5xl`}>Login</h1>
      <p className={`mt-3 text-xs sm:text-base lg:text-lg`}>
        Not Registered With Us. Click <NavLink to={ROUTES.register}>Here</NavLink> to register with us.
      </p>

      <form onSubmit={submitHandler} className={`flex flex-col gap-3 mt-8 text-sm sm:text-lg lg:text-xl`}>
        <Input control={control} name="email" placeholder="Your Registered Email">
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

export default LoginForm
