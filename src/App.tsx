import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import NavMenu from './component/UI/NavMenu'

const App: FC = () => {
  return (
    <>
      <NavMenu />

      <Outlet />
    </>
  )
}

export default App
