import { FC, memo, useEffect } from 'react'
import { Outlet } from 'react-router'
import { useAppStore } from '../state/store'
import UserSelectors from '../state/selector/user.selector'
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
    <div className={`min-w-full min-h-screen bg-black `}>
      <Outlet />
    </div>
  )
}

export default memo(Root)
