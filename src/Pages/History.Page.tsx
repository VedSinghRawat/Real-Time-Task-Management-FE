import { FC, memo } from 'react'
import { useTaskStore } from '../Store/task.store'
import { taskListDateFilteredSelector } from '../Store/task.selector'
import { useParams } from 'react-router'
import { format } from 'date-fns'
import Overview from '../Components/Pages/History/Overview'
import TimeSpent from '../Components/Pages/History/TimeSpent'
import TaskDetailBarGraph from '../Components/Pages/History/TaskDetailBarGraph'

interface HistoryProps {}

const History: FC<HistoryProps> = () => {
  const { history } = useParams()

  const historyDate = history ? new Date(history) : undefined
  const taskList = useTaskStore(taskListDateFilteredSelector(historyDate))

  if (!historyDate) return

  return (
    <div className={`max-w-[100vw] w-full px-6 text-secondary-600 py-4 `}>
      <h1 className={`text-2xl text-center`}>History for {format(historyDate, 'io LLLL yyyy')}</h1>

      <Overview tasks={taskList} />

      <TimeSpent className={`my-4`} historyDate={historyDate} taskList={taskList} />

      <TaskDetailBarGraph taskList={taskList} className={'my-4'} />
    </div>
  )
}

export default memo(History)
