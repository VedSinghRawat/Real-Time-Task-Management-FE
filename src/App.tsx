import { FC } from 'react'
import TaskMultiList from './Components/Task/Lists/TaskMultiList'

const App: FC = () => {
  return (
    <div className={`bg-primary-600 h-full w-full p-20`}>
      <div className={`mb-10`}>
        <h1 className={`text-secondary-600 text-6xl text-center`}>Total Estimated Time</h1>
      </div>

      <TaskMultiList />
    </div>
  )
}

export default App
