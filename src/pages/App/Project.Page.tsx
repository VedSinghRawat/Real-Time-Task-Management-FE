import { FC, memo } from 'react'
import TaskMultiList from '../../component/Task/Lists/TaskMultiList'
import Info from '../../component/UI/Info'
import LeftoverTasksPopup from '../../component/UI/Popups/LeftoverTasksPopup'
import TaskDonePopup from '../../component/UI/Popups/TaskDonePopup'
import TaskSelectors from '../../state/selector/task.selector'
import { useAppStore } from '../../state/store'

interface ProjectProps {}

const Project: FC<ProjectProps> = () => {
  const tasksToConfirm = useAppStore(TaskSelectors.ProjectList)

  return (
    <section className={`flex flex-col mt-4 grow`}>
      <Info />

      <TaskMultiList className={`overflow-x-auto gap-x-8 px-8 mx-auto mt-8 w-full max-w-5xl md:gap-x-16 md:mt-16 grow`} />

      <LeftoverTasksPopup />

      {tasksToConfirm.map((task) => (
        <TaskDonePopup key={task.id} task={task} />
      ))}
    </section>
  )
}

export default memo(Project)
