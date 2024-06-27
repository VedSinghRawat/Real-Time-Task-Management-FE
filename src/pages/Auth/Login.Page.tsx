import { FC, memo } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div
      className={`border-tertiary-3 border bg-tertiary-2 bg-opacity-20 backdrop-blur-sm fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-8 rounded-xl`}
    >
      <h1 className={`text-secondary-1`}>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} />
        <input {...register('password')} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default memo(Login)
