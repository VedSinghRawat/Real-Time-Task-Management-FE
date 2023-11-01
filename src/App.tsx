import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavMenu from './Components/UI/NavMenu'
import { isMobile } from 'react-device-detect'

const App: FC = () => {
  const { pathname } = useLocation()

  return (
    <div
      className={`bg-primary-600 ${
        pathname === '/' && isMobile ? 'min-h-[calc(100vh-0.5rem)]' : 'min-h-screen'
      } relative w-fit min-w-full flex flex-col`}
    >
      <NavMenu />

      <Outlet />
    </div>
  )
}

export default App
