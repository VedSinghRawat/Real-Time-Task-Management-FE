import { FC, memo } from 'react'
import TaskMultiList from '../../component/Task/Lists/TaskMultiList'
import useProjectPage from '../../hooks/useProjectPage'

interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = () => {
  const { tasks } = useProjectPage()
  console.log({ tasks })

  return (
    <section className={`flex flex-col mt-4 grow`}>
      {/* <Info /> */}

      <TaskMultiList tasks={tasks} className={`overflow-x-auto gap-x-8 px-8 mx-auto mt-8 w-full max-w-5xl md:gap-x-16 md:mt-16 grow`} />

      {/* <LeftoverTasksPopup /> */}

      {/* {tasksToConfirm.map((task) => (
        <TaskDonePopup key={task.id} task={task} />
      ))} */}
    </section>
  )
}

export default memo(ProjectPage)
