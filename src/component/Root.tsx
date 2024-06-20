import { FC, memo, useEffect } from 'react'
import { Outlet } from 'react-router'
import { useAppStore } from '../state/store'
import UserSelectors from '../state/selector/user.selector'
import { ROUTES } from '../routes'

interface RootProps {}

const Root: FC<RootProps> = () => {
  const fetchMe = useAppStore(UserSelectors.base.fetchMe)

  useEffect(() => {
    fetchMe && void fetchMe()
  }, [])

  return (
    <div className={`${ROUTES.LOGIN ? 'pattern-bg' : ''} px-6 py-11 md:pt-[4.5rem] md:px-[4.5rem] min-w-full min-h-screen flex flex-col`}>
      <Outlet />
    </div>
  )
}

export default memo(Root)
