import { FC, memo } from 'react'
import { useTaskStore } from '../Store/task.store'
import { taskListParamFilteredListSelector } from '../Store/task.selector'
import { useParams } from 'react-router'
import { format } from 'date-fns'
import Overview from '../Components/Pages/History/Overview'
import TimeSpent from '../Components/Pages/History/TimeSpent'
import TaskDetailBarGraph from '../Components/Pages/History/TaskDetailBarGraph'

interface HistoryProps {}

const History: FC<HistoryProps> = () => {
  const { history } = useParams()

  const taskList = useTaskStore(taskListParamFilteredListSelector)

  if (!history) return

  const historyDate = new Date(history)

  let totalEstimatedTime = 0
  let totalTimeWorked = 0
  let overTimeWorked = 0
  let underEstimate = 0

  taskList.forEach((task) => {
    task.overTime > 0 ? (totalTimeWorked += task.overTime + task.estimatedTime) : (totalTimeWorked += task.estimatedTime - task.timeLeft)
    overTimeWorked += task.overTime
    totalEstimatedTime += task.estimatedTime
    if (task.overTime === 0) underEstimate += task.estimatedTime - task.timeLeft
  }, 0)

  return (
    <div className={`w-full px-6 text-secondary-600 py-4 `}>
      <h1 className={`text-2xl text-center`}>History for {format(historyDate, 'io LLLL yyyy')}</h1>

      <Overview tasks={taskList} />

      <TimeSpent
        className={`my-4`}
        historyDate={historyDate}
        overTimeWorked={overTimeWorked}
        totalEstimatedTime={totalEstimatedTime}
        totalTimeWorked={totalTimeWorked}
        underEstimate={underEstimate}
      />

      <TaskDetailBarGraph className={'my-4'} />
    </div>
  )
}

export default memo(History)
