import { FC, memo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Store, useAppStore } from '../../../state/store'
import Routes from '../../../routes'
import userSelectors from '../../../state/selector/user.selector'

interface AuthContainerProps {}

const selectors = (state: Store) => ({
  meId: userSelectors.base.meId(state),
})

const AuthContainer: FC<AuthContainerProps> = () => {
  const { meId } = useAppStore(selectors)

  console.log({ meId })

  if (meId) return <Navigate to={Routes.home} />

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-8 py-10 sm:px-24 pattern-bg`}>
      <div
        className={`w-full max-w-md px-8 py-5 border border-primary-4 bg-primary-2 bg-opacity-30 backdrop-blur-sm sm:px-12 sm:py-9 rounded-xl sm:max-w-xl`}
      >
        <img src="/assets/img/logo.png" alt="logo" className={`w-3/4 mx-auto mb-5 sm:mb-8`} />

        <Outlet />
      </div>
    </div>
  )
}

export default memo(AuthContainer)
