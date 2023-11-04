import { FC, memo } from 'react'
import { useTaskStore } from '../Store/task.store'
import { taskListDateFilteredSelector } from '../Store/task.selector'
import { useParams } from 'react-router'
import { format } from 'date-fns'
import Overview from '../Components/Pages/History/Overview'
import TimeSpent from '../Components/Pages/History/TimeSpent'
import TasksDetail from '../Components/Pages/History/TasksDetail'

interface HistoryProps {}

const History: FC<HistoryProps> = () => {
  const { history } = useParams()

  const historyDate = history ? new Date(history) : undefined
  const taskList = useTaskStore(taskListDateFilteredSelector(historyDate))

  if (!historyDate) return

  return (
    <section>
      <h1 className={`text-2xl text-center`}>History for {format(historyDate, ' do LLLL yyyy')}</h1>

      <Overview tasks={taskList} />

      <TimeSpent className={`mt-12`} historyDate={historyDate} taskList={taskList} />

      <TasksDetail taskList={taskList} className={'mt-12'} />
    </section>
  )
}

export default memo(History)
