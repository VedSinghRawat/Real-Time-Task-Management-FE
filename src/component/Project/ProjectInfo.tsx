import { FC, memo } from 'react'
import { secondsToHHMMSS } from '../../utils'
import useProjectInfo from '../../hooks/useProjectInfo'
import { Task } from '../../entities'

interface ProjectInfoProps {
  tasks: Task[]
}

const ProjectInfo: FC<ProjectInfoProps> = ({ tasks }) => {
  const { remainingTime, done } = useProjectInfo(tasks)

  return (
    <div className={`text-center sticky inset-x-0 max-w-[100vw] -mx-6 md:-mx-[4.5rem]`}>
      <h1 className={`text-2xl md:text-4xl`}>Total Estimated Time:</h1>

      <p className={`text-3xl md:text-5xl`}>{secondsToHHMMSS(remainingTime)}</p>

      <h2 className={`text-2xl md:text-4xl`}>
        Done{' '}
        <span className={`text-3xl md:text-5xl`}>
          {done}/{tasks.length}
        </span>
      </h2>
    </div>
  )
}

export default memo(ProjectInfo)
