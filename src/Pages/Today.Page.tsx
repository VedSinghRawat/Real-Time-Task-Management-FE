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
    <section className={`mt-4 flex flex-col grow`}>
      <Info />

      <TaskMultiList className={`gap-x-8 px-8 md:gap-x-16 mx-auto mt-8 md:mt-16 grow overflow-x-auto w-full max-w-5xl`} />

      <LeftoverTasksPopup />

      {tasksToConfirm.map((task) => (
        <TaskDonePopup key={task.id} task={task} />
      ))}
    </section>
  )
}

export default memo(Today)
