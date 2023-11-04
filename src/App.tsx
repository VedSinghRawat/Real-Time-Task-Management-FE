import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavMenu from './Components/UI/NavMenu'

const App: FC = () => {
  const { pathname } = useLocation()

  return (
    <div
      className={`bg-primary-600 text-secondary-600 px-6 py-11 min-w-[100vw] ${
        pathname === '/' ? 'lg:min-h-screen min-h-[calc(100vh-0.5rem)] ' : ''
      } relative w-fit min-w-full flex flex-col`}
    >
      <NavMenu />

      <Outlet />
    </div>
  )
}

export default App
