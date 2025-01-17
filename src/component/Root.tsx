import { FC, memo, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Store, useAppStore } from '../state/store'
import userSelectors from '../state/selector/user.selector'
import { loadingSelector } from '../state/selector'
import { Loading } from './UI/Loading'
import { useShallow } from 'zustand/shallow'
import Routes from '../routes'

interface RootProps {}

const selectors = (state: Store) => ({
  fetchMe: userSelectors.base.fetchMe(state),
  meId: userSelectors.base.meId(state),
  loading: loadingSelector(state),
})

const Root: FC<RootProps> = () => {
  const { fetchMe, loading, meId } = useAppStore(useShallow(selectors))

  const navigator = useNavigate()

  useEffect(() => {
    if (meId === undefined) void fetchMe()
    else if (meId === null) navigator(Routes.login)
    else if (window.location.pathname === '/') navigator(Routes.home)
  }, [fetchMe, meId, navigator])

  if (loading || meId === undefined) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loading />
      </div>
    )
  }

  return (
    <div className={`min-w-full min-h-screen bg-black text-primary-12`}>
      <Outlet />
    </div>
  )
}

export default memo(Root)
