import { Form, Formik } from 'formik'
import { FC, memo } from 'react'

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <div className={`border-tertiary-600 border-2 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-8 rounded-xl`}>
      <h1>Login</h1>

      <Formik>
        <Form></Form>
      </Formik>
    </div>
  )
}

export default memo(Login)
