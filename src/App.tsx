import { FC } from 'react'
import TaskMultiList from './Components/Task/Lists/TaskMultiList'
import { useTaskStore } from './Store/task.store'
import { taskListSelector, taskToConfirmDoneListSelector, taskTotalRemainingTime, taskTypedListSelector } from './Store/task.selector'
import { secondsToHHMMSS } from './utils'
import TaskDonePopup from './Components/UI/Popups/TaskDonePopup'

const App: FC = () => {
  const totalRemainingTime = useTaskStore(taskTotalRemainingTime)
  const doneTaskList = useTaskStore(taskTypedListSelector('done'))
  const taskList = useTaskStore(taskListSelector)
  const tasksToConfirm = useTaskStore(taskToConfirmDoneListSelector)

  console.log(tasksToConfirm)

  return (
    <div className={`bg-primary-600 h-[calc(100vh-0.5rem)] relative w-fit min-w-full`}>
      <div className={`text-center mb-10 text-secondary-600 max-w-[100vw] sticky inset-x-0 pt-10`}>
        <h1 className={`text-3xl`}>Total Estimated Time:</h1>

        <p className={`text-xl`}>{secondsToHHMMSS(totalRemainingTime)}</p>

        <h2 className={`text-2xl`}>
          Done {doneTaskList.length}/{taskList.length}
        </h2>
      </div>

      <TaskMultiList className={`gap-x-8 h-[70vh] px-8`} />

      {tasksToConfirm.map((task) => (
        <TaskDonePopup key={task.id} task={task} />
      ))}
    </div>
  )
}

export default App
