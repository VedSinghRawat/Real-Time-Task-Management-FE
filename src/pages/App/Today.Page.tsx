import { FC, memo } from 'react'
import TaskMultiList from '../../component/Task/Lists/TaskMultiList'
import Info from '../../component/UI/Info'
import LeftoverTasksPopup from '../../component/UI/Popups/LeftoverTasksPopup'
import TaskDonePopup from '../../component/UI/Popups/TaskDonePopup'
import { useTaskStore } from '../../state/store/task.store'
import { taskToConfirmDoneListSelector } from '../../state/selector/task.selector'

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
