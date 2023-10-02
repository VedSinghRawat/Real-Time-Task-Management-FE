import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideBar from './Components/UI/SideBar'

const App: FC = () => {
  const { pathname } = useLocation()

  return (
    <div className={`bg-primary-600 ${pathname !== '/' ? 'min-h-screen' : 'min-h-[calc(100vh-0.5rem)] '} relative w-fit min-w-full flex flex-col`}>
      <SideBar />

      <Outlet />
    </div>
  )
}

export default App
