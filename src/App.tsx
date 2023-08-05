import { FC } from 'react'
import TaskMultiList from './Components/Task/Lists/TaskMultiList'
import Timer from './Components/UI/Timer'

const App: FC = () => {
  return (
    <div className={`bg-primary-600 h-[calc(100vh-0.5rem)] relative w-fit min-w-full px-5 py-10`}>
      <div className={`text-center mb-10 text-secondary-600 `}>
        <h1 className={`text-3xl`}>Total Estimated Time</h1>
        <Timer className={`text-xl`} timeInSeconds={100000} />
        <h2 className={`text-2xl`}>Done 1/1</h2>
      </div>

      <TaskMultiList className={`gap-x-8 max-h-[70vh]`} />
    </div>
  )
}

export default App
