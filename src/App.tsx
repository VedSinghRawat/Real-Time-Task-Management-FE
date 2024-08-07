import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const App: FC = () => {
  return (
    <>
      {/* <NavMenu /> */}

      <div className="px-12 py-8 ">
        <Outlet />
      </div>
    </>
  )
}

export default App
