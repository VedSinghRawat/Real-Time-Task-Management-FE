import { FC, memo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Store, useAppStore } from '../../../state/store'
import Routes from '../../../routes'
import userSelectors from '../../../state/selector/user.selector'
import { useShallow } from 'zustand/shallow'

interface AuthContainerProps {}

const selectors = (state: Store) => ({
  meId: userSelectors.base.meId(state),
})

const AuthContainer: FC<AuthContainerProps> = () => {
  const { meId } = useAppStore(useShallow(selectors))
  if (meId) return <Navigate to={Routes.home} />

  return (
    <div className={`flex flex-col justify-center items-center px-8 py-10 min-h-screen sm:px-24 pattern-bg`}>
      <div
        className={`px-8 py-5 w-full max-w-md bg-opacity-30 rounded-xl border backdrop-blur-xs sm:px-12 sm:py-9 sm:max-w-xl bg-primary-2 border-primary-4`}
      >
        <img src="/assets/img/logo.png" alt="logo" className={`mx-auto mb-5 w-3/4 sm:mb-8`} />

        <Outlet />
      </div>
    </div>
  )
}

export default memo(AuthContainer)
