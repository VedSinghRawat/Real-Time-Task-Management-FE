import { FC } from 'react'
import Header from './Components/UI/Header'
import { Outlet, useParams } from 'react-router-dom'

const App: FC = () => {
  const { history } = useParams()

  return (
    <div className={`bg-primary-600 ${history ? 'h-screen' : 'h-[calc(100vh-0.5rem)] '} relative w-fit min-w-full`}>
      <Header />

      <Outlet />
    </div>
  )
}

export default App
