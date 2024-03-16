import { FC, memo } from 'react'
import TaskSelectors from '../../state/selector/task.selector'
import { secondsToHHMMSS } from '../../utils'
import { useAppStore } from '../../state/store'

interface InfoProps {}

const Info: FC<InfoProps> = () => {
  const totalRemainingTime = useAppStore(TaskSelectors.totalRemainingTime)
  const doneTaskList = useAppStore(TaskSelectors.listByType('done'))
  const taskList = useAppStore(TaskSelectors.todayList)

  return (
    <div className={`text-center text-secondary-light sticky inset-x-0 max-w-[100vw] -mx-6 md:-mx-[4.5rem]`}>
      <h1 className={`text-2xl md:text-4xl`}>Total Estimated Time:</h1>

      <p className={`text-3xl md:text-5xl`}>{secondsToHHMMSS(totalRemainingTime)}</p>

      <h2 className={`text-2xl md:text-4xl`}>
        Done{' '}
        <span className={`text-3xl md:text-5xl`}>
          {doneTaskList.length}/{taskList.length}
        </span>
      </h2>
    </div>
  )
}

export default memo(Info)
