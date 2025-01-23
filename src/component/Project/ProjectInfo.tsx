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
    <div className={`sticky w-[calc(100vw-0.5rem)] inset-x-0 -mx-8 text-center`}>
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
