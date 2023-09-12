import { FC, memo } from 'react'
import { useTaskStore } from '../Store/task.store'
import { taskListParamFilteredListSelector } from '../Store/task.selector'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { secondsToHHMMSS } from '../utils'
import { useParams } from 'react-router'
import { format } from 'date-fns'

interface HistoryProps {}

const RADIAN = Math.PI / 180

const History: FC<HistoryProps> = () => {
  const { history } = useParams()

  const taskList = useTaskStore(taskListParamFilteredListSelector)

  if (!history) return

  const historyDate = new Date(history)

  const overviewData = [
    {
      label: 'were not started',
      length: taskList.filter((t) => t.type === 'todo').length,
      color: '#F03C3D',
    },
    {
      label: 'were doing',
      length: taskList.filter((t) => t.type === 'doing').length,
      color: '#FEE12B',
    },
    {
      label: 'were done',
      length: taskList.filter((t) => t.type === 'done').length,
      color: '#0FFF95',
    },
  ]

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
    <div className={`w-full px-6 text-secondary-600 py-4 text-lg`}>
      <h1 className={`text-2xl text-center`}>History for {format(historyDate, 'io LLLL yyyy')}</h1>

      <div>
        <h2 className={`text-xl `}>Overview</h2>

        <ResponsiveContainer aspect={1} className={`max-w-xs mx-auto`}>
          <PieChart className={`w-1/2 h-1/2`}>
            <Pie
              dataKey={'length'}
              data={overviewData}
              label={(data: {
                cy: number
                cx: number
                innerRadius: number
                outerRadius: number
                midAngle: number
                percent: number
                payload: { payload: (typeof overviewData)[number] }
              }) => {
                const { cx, cy, innerRadius, midAngle, payload, outerRadius, percent } = data

                const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`} {payload.payload.label}
                  </text>
                )
              }}
              labelLine={false}
              cy={'50%'}
              cx={'50%'}
            >
              {overviewData.map(({ color }) => {
                return <Cell key={`cell-${color}`} fill={color} />
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={`my-4`}>
        <h2 className={`text-xl mb-2`}>Time Spent</h2>

        <p>Your estimate for the day was: {secondsToHHMMSS(totalEstimatedTime)}</p>

        <p>
          Total time worked on {format(historyDate, 'io LLLL')}: {secondsToHHMMSS(totalTimeWorked)}
        </p>

        <p>over estimate worked: {secondsToHHMMSS(overTimeWorked)}</p>

        <p>time under your estimate: {secondsToHHMMSS(underEstimate)}</p>
      </div>

      <div className={`my-4`}>
        <h2 className={`text-xl`}>Detailed Task analysis</h2>

        <p>bar graph showing time spent on individual tasks</p>

        <p></p>
      </div>

      <div className={`my-4`}>
        <h2 className={`text-xl`}>All task List</h2>

        <p>expandable list of all the tasks of the day</p>
      </div>
    </div>
  )
}

export default memo(History)
