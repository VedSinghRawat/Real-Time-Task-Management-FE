import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './component/UI/NavBar'

const App: FC = () => {
  return (
    <>
      <NavBar />

      <div className="px-8 py-4">
        <Outlet />
      </div>
    </>
  )
}

export default App
