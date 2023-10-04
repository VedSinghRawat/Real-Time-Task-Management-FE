import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavMenu from './Components/UI/NavMenu'

const App: FC = () => {
  const { pathname } = useLocation()

  return (
    <div className={`bg-primary-600 ${pathname !== '/' ? 'min-h-screen' : 'min-h-[calc(100vh-0.5rem)] '} relative w-fit min-w-full flex flex-col`}>
      <NavMenu />

      <Outlet />
    </div>
  )
}

export default App
