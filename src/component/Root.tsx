import { FC, memo, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Store, useAppStore } from '../state/store'
import userSelectors from '../state/selector/user.selector'
import { loadingSelector } from '../state/selector'
import { Loading } from './UI/Loading'
import { useShallow } from 'zustand/shallow'
import Routes from '../routes'
import { cn } from '../utils/tailwind'
import { isMobile } from 'react-device-detect'
import presenceSelectors from '../state/selector/presence.selector'

interface RootProps {}

const selectors = (state: Store) => ({
  fetchMe: userSelectors.base.fetchMe(state),
  meId: userSelectors.base.meId(state),
  loading: loadingSelector(state),
  initializePresence: presenceSelectors.base.initializePresence(state),
  cleanupPresence: presenceSelectors.base.cleanupPresence(state),
})

const Root: FC<RootProps> = () => {
  const { fetchMe, loading, meId, initializePresence, cleanupPresence } = useAppStore(useShallow(selectors))

  const navigator = useNavigate()

  useEffect(() => {
    if (meId === undefined) void fetchMe()
    else if (meId === null) navigator(Routes.login)
    else if (window.location.pathname === '/') navigator(Routes.home)
  }, [fetchMe, meId, navigator])

  useEffect(() => {
    if (meId) {
      initializePresence(meId)

      return () => {
        void cleanupPresence()
      }
    } else if (meId === null) {
      void cleanupPresence()
    }
  }, [meId, initializePresence, cleanupPresence])

  if (loading || meId === undefined) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loading />
      </div>
    )
  }

  return (
    <div
      className={cn(`min-h-screen bg-black text-primary-12`, {
        'min-w-fit': !isMobile,
      })}
    >
      <Outlet />
    </div>
  )
}

export default memo(Root)
