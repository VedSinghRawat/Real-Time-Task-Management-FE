import { FC, memo } from 'react'
import TaskMultiList from '../../component/Task/Lists/TaskMultiList'
import useProjectPage from '../../hooks/useProjectPage'
import ProjectInfo from '../../component/Project/ProjectInfo'
import { cn } from '../../utils/tailwind'
import { isMobile } from 'react-device-detect'

interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = () => {
  const { tasks } = useProjectPage()

  return (
    <section className={`flex flex-col mt-4 sm:items-center grow`}>
      <ProjectInfo tasks={tasks} />

      <TaskMultiList
        tasks={tasks}
        className={cn(`gap-x-8 px-8 py-12 w-full max-w-5xl md:gap-x-16 md:py-16 grow`, {
          'overflow-x-auto': isMobile,
        })}
      />

      {/* <LeftoverTasksPopup /> */}

      {/* {tasksToConfirm.map((task) => (
        <TaskDonePopup key={task.id} task={task} />
      ))} */}
    </section>
  )
}

export default memo(ProjectPage)
