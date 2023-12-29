import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import NavMenu from './Components/UI/NavMenu'

const App: FC = () => {
  return (
    <div className={`bg-primary-600 text-secondary-600 px-6 py-11 md:pt-[4.5rem] md:px-[4.5rem] w-fit min-w-full`}>
      <NavMenu />

      <Outlet />
    </div>
  )
}

export default App
