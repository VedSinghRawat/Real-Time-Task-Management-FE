import { FC } from 'react'
import TaskMultiList from './Components/Task/Lists/TaskMultiList'
import { useTaskStore } from './Store/task.store'
import { taskToConfirmDoneListSelector } from './Store/task.selector'
import TaskDonePopup from './Components/UI/Popups/TaskDonePopup'
import Info from './Components/UI/Info'
import Header from './Components/UI/Header'

const App: FC = () => {
  const tasksToConfirm = useTaskStore(taskToConfirmDoneListSelector)

  return (
    <div className={`bg-primary-600 h-[calc(100vh-0.5rem)] relative w-fit min-w-full`}>
      <Header />

      <Info />

      <TaskMultiList className={`gap-x-8 h-[65vh] px-8`} />

      {tasksToConfirm.map((task) => (
        <TaskDonePopup key={task.id} task={task} />
      ))}
    </div>
  )
}

export default App
