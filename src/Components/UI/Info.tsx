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
    <section className={`text-center py-6 text-secondary-600 max-w-[100vw] sticky inset-x-0 -mx-6`}>
      <h1 className={`text-2xl`}>Total Estimated Time:</h1>

      <p className={`text-3xl`}>{secondsToHHMMSS(totalRemainingTime)}</p>

      <h2 className={`text-2xl`}>
        Done{' '}
        <span className={`text-3xl`}>
          {doneTaskList.length}/{taskList.length}
        </span>
      </h2>
    </section>
  )
}

export default memo(Info)
