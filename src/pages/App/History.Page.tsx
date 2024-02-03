import { FC, memo } from 'react'
import { useParams } from 'react-router'
import { format } from 'date-fns'
import Overview from '../../component/Pages/History/Overview'
import TasksDetail from '../../component/Pages/History/TasksDetail'
import TimeSpent from '../../component/Pages/History/TimeSpent'
import { useTaskStore } from '../../state/store/task.store'
import { taskListDateFilteredSelector } from '../../state/selector/task.selector'

interface HistoryProps {}

const History: FC<HistoryProps> = () => {
  const { history } = useParams()

  const historyDate = history ? new Date(history) : undefined
  const taskList = useTaskStore(taskListDateFilteredSelector(historyDate))

  if (!historyDate) return

  return (
    <section className={``}>
      <h1 className={`text-2xl text-center`}>History for {format(historyDate, ' do LLLL yyyy')}</h1>

      <Overview className={`mt-12`} tasks={taskList} />

      <TimeSpent className={`mt-12`} historyDate={historyDate} taskList={taskList} />

      <TasksDetail taskList={taskList} className={'mt-12'} />
    </section>
  )
}

export default memo(History)
