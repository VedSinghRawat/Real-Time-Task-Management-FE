import { FC } from 'react'
import TaskMultiList from './Components/Task/Lists/TaskMultiList'

const App: FC = () => {
  return (
    <div className={`bg-primary-600 xl:h-screen h-[calc(100vh-0.5rem)] w-fit min-w-full py-10 flex flex-col`}>
      <div className={`mb-10`}>
        <h1 className={`text-secondary-600 text-6xl text-center`}>Total Estimated Time</h1>
      </div>

      <TaskMultiList className={`px-12 h-[calc(100vh-15.25rem)] `} />
    </div>
  )
}

export default App
