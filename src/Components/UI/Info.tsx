import { FC, memo } from 'react'
import { taskTotalRemainingTimeSelector, taskTypedListSelector, taskTodayListSelector } from '../../Store/task.selector'
import { useTaskStore } from '../../Store/task.store'
import { secondsToHHMMSS } from '../../utils'

interface InfoProps {}

const Info: FC<InfoProps> = () => {
  const totalRemainingTime = useTaskStore(taskTotalRemainingTimeSelector)
  const doneTaskList = useTaskStore(taskTypedListSelector('done'))
  const taskList = useTaskStore(taskTodayListSelector)

  return (
    <div className={`text-center text-secondary-600 sticky inset-x-0 max-w-[100vw] -mx-6 md:-mx-[4.5rem]`}>
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
