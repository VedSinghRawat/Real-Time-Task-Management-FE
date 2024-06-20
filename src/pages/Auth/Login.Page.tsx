import { Form, Formik } from 'formik'
import { FC, memo } from 'react'

interface LoginProps {}

const initValues = {}
const Login: FC<LoginProps> = () => {
  return (
    <div
      className={`border-tertiary-3 border bg-tertiary-2 bg-opacity-20 backdrop-blur-sm fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-8 rounded-xl`}
    >
      <h1 className={`text-secondary-1`}>Login</h1>

      <Formik
        initialValues={initValues}
        onSubmit={() => {
          return
        }}
      >
        <Form></Form>
      </Formik>
    </div>
  )
}

export default memo(Login)
