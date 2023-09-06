import { FC, memo } from 'react'
import { taskTotalRemainingTime, taskTypedListSelector, taskListSelector } from '../../Store/task.selector'
import { useTaskStore } from '../../Store/task.store'
import { secondsToHHMMSS } from '../../utils'

interface InfoProps {}

const Info: FC<InfoProps> = ({}) => {
  const totalRemainingTime = useTaskStore(taskTotalRemainingTime)
  const doneTaskList = useTaskStore(taskTypedListSelector('done'))
  const taskList = useTaskStore(taskListSelector)

  return (
    <div className={`text-center py-6 text-secondary-600 max-w-[100vw] sticky inset-x-0`}>
      <h1 className={`text-2xl`}>Total Estimated Time:</h1>

      <p className={`text-3xl`}>{secondsToHHMMSS(totalRemainingTime)}</p>

      <h2 className={`text-2xl`}>
        Done{' '}
        <span className={`text-3xl`}>
          {doneTaskList.length}/{taskList.length}
        </span>
      </h2>
    </div>
  )
}

export default memo(Info)
