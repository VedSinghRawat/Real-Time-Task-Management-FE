import { FC, memo, useEffect } from 'react'
import { Outlet } from 'react-router'
import { useAppStore } from '../state/store'
import UserSelectors from '../state/selector/user.selector'
import { ROUTES } from '../routes'
import { loadingSelector } from '../state/selector'
import { Loading } from './UI/Loading'

interface RootProps {}

const Root: FC<RootProps> = () => {
  const fetchMe = useAppStore(UserSelectors.base.fetchMe)
  const loading = useAppStore(loadingSelector)

  useEffect(() => {
    fetchMe && void fetchMe()
  }, [fetchMe])

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loading />
      </div>
    )

  return (
    <div className={`${ROUTES.LOGIN ? 'pattern-bg' : 'bg-black'} px-6 py-11 md:pt-[4.5rem] md:px-[4.5rem] min-w-full min-h-screen flex flex-col`}>
      <Outlet />
    </div>
  )
}

export default memo(Root)
