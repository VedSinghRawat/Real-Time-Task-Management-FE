import { format } from 'date-fns'
import { FC, memo } from 'react'
import { secondsToHHMMSS } from '../../../utils'

interface TimeSpentProps {
  totalEstimatedTime: number
  totalTimeWorked: number
  overTimeWorked: number
  underEstimate: number
  historyDate: Date
  className?: string
}

const TimeSpent: FC<TimeSpentProps> = ({ overTimeWorked, className, historyDate, totalEstimatedTime, totalTimeWorked, underEstimate }) => {
  return (
    <section className={className}>
      <h2 className={`text-xl mb-2`}>Time Spent</h2>

      <p>Your estimate for the day was: {secondsToHHMMSS(totalEstimatedTime)}</p>

      <p>
        Total time worked on {format(historyDate, 'io LLLL')}: {secondsToHHMMSS(totalTimeWorked)}
      </p>

      <p>Time spent over your estimate: {secondsToHHMMSS(overTimeWorked)}</p>

      <p>Time saved under your estimate: {secondsToHHMMSS(underEstimate)}</p>
    </section>
  )
}

export default memo(TimeSpent)
