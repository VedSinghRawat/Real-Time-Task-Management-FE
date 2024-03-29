import { format } from 'date-fns'
import { FC, memo } from 'react'
import { secondsToHHMMSS } from '../../../utils'
import { Task } from '../../../model/Task'

interface TimeSpentProps {
  taskList: Task[]
  historyDate: Date
  className?: string
}

const TimeSpent: FC<TimeSpentProps> = ({ taskList, historyDate, className }) => {
  let totalEstimatedTime = 0
  let totalTimeWorked = 0
  let overTimeWorked = 0
  let underEstimate = 0

  taskList.forEach((task) => {
    task.overTime > 0 ? (totalTimeWorked += task.overTime + task.estimatedTime) : (totalTimeWorked += task.estimatedTime - task.timeLeft)
    overTimeWorked += task.overTime
    totalEstimatedTime += task.estimatedTime
    underEstimate += task.type !== 'todo' ? task.timeLeft : 0
  }, 0)

  return (
    <section className={className}>
      <h2 className={`text-xl mb-2`}>Time Spent</h2>

      <p>
        Your estimate for the day was: <span className={`font-semibold text-lg`}>{secondsToHHMMSS(totalEstimatedTime)}</span>
      </p>

      <p>
        Total time worked on {format(historyDate, 'do LLLL')}: <span className={`font-semibold text-lg`}>{secondsToHHMMSS(totalTimeWorked)}</span>
      </p>

      <p>
        Time spent over your estimate: <span className={`text-red-500 font-semibold text-lg`}>{secondsToHHMMSS(overTimeWorked)}</span>
      </p>

      <p>
        Time saved under your estimate: <span className={`font-semibold  text-[#82ca9d] text-lg`}>{secondsToHHMMSS(underEstimate)}</span>
      </p>
    </section>
  )
}

export default memo(TimeSpent)
