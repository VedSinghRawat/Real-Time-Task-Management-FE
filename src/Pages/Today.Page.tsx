import { FC, memo } from 'react'
import TaskMultiList from '../Components/Task/Lists/TaskMultiList'
import Info from '../Components/UI/Info'
import TaskDonePopup from '../Components/UI/Popups/TaskDonePopup'
import { taskToConfirmDoneListSelector } from '../Store/task.selector'
import { useTaskStore } from '../Store/task.store'

interface TodayProps {}

const Today: FC<TodayProps> = ({}) => {
  const tasksToConfirm = useTaskStore(taskToConfirmDoneListSelector)
  console.log(tasksToConfirm)

  return (
    <>
      <Info />

      <TaskMultiList className={`gap-x-8 h-[65vh] px-8`} />

      {tasksToConfirm.map((task) => (
        <TaskDonePopup key={task.id} task={task} />
      ))}
    </>
  )
}

export default memo(Today)
