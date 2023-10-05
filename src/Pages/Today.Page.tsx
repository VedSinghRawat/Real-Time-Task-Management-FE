import { FC, memo } from 'react'
import TaskMultiList from '../Components/Task/Lists/TaskMultiList'
import Info from '../Components/UI/Info'
import TaskDonePopup from '../Components/UI/Popups/TaskDonePopup'
import { taskToConfirmDoneListSelector } from '../Store/task.selector'
import { useTaskStore } from '../Store/task.store'
import LeftoverTasksPopup from '../Components/UI/Popups/LeftoverTasksPopup'

interface TodayProps {}

const Today: FC<TodayProps> = () => {
  const tasksToConfirm = useTaskStore(taskToConfirmDoneListSelector)

  return (
    <>
      <LeftoverTasksPopup />

      <Info />

      <TaskMultiList className={`gap-x-8 max-h-[65vh] px-8 grow`} />

      {tasksToConfirm.map((task) => (
        <TaskDonePopup key={task.id} task={task} />
      ))}
    </>
  )
}

export default memo(Today)
