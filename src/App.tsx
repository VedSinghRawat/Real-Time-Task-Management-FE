import { FC } from 'react'
import { getHistoryParam } from './utils'
import TodayPage from './Pages/Today.Page'
import Header from './Components/UI/Header'

const App: FC = () => {
  const historyParam = getHistoryParam()

  console.log(historyParam)

  return (
    <div className={`bg-primary-600 ${historyParam ? 'h-screen' : 'h-[calc(100vh-0.5rem)] '} relative w-fit min-w-full`}>
      <Header />
      {historyParam ? <></> : <TodayPage />}
    </div>
  )
}

export default App
