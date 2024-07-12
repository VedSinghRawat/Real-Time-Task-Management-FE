import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

interface AuthContainerProps {}

const AuthContainer: FC<AuthContainerProps> = () => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-8 py-10 sm:px-24 pattern-bg`}>
      <div
        className={`w-full max-w-md px-8 py-5 border border-primary-4 text-primary-12 bg-primary-2 bg-opacity-30 backdrop-blur-sm sm:px-12 sm:py-9 rounded-xl sm:max-w-xl`}
      >
        <img src="/assets/img/logo.png" alt="logo" className={`w-3/4 mx-auto mb-5 sm:mb-8`} />

        <Outlet />
      </div>
    </div>
  )
}

export default memo(AuthContainer)
