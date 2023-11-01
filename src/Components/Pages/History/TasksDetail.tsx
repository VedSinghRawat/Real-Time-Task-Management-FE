import { FC, memo } from 'react'
import { Task } from '../../../Model/Task'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { secondsToHHMMSS } from '../../../utils'
import { CustomTooltip } from '../../UI/CustomTooltip'

interface TaskDetailBarGraphProps {
  taskList: Task[]
  className?: string
}

const TasksDetail: FC<TaskDetailBarGraphProps> = ({ className = '', taskList }) => {
  const startedTasks = taskList.filter((t) => t.type !== 'todo')

  let tasksUnderTimeCount = 0
  let tasksOverTimeCount = 0
  let tasksInTimeCount = 0

  const timeGraphData: {
    description: string
    type: 'todo' | 'doing' | 'done'
    timeLeft: number
    timeSaved: number
    overTime: number
    timeTaken: number
  }[] = []

  const progressGraphData: {
    progress: number
    overEstimate: number
    description: string
  }[] = []

  let maxProgress = 0

  startedTasks.forEach(({ description, type, estimatedTime, overTime, timeLeft }) => {
    const timeTaken = estimatedTime - timeLeft

    if (type === 'done') {
      if (timeLeft > 0) tasksUnderTimeCount++
      else if (overTime !== 0) tasksOverTimeCount++
      else tasksInTimeCount++
    }

    timeGraphData.push({
      description,
      type,
      timeLeft: type === 'done' ? 0 : timeLeft,
      timeSaved: type === 'done' ? timeLeft : 0,
      overTime,
      timeTaken,
    })

    if (type === 'doing') {
      const progress = +((timeTaken / estimatedTime) * 100).toFixed(2)
      const overEstimate = +((overTime / estimatedTime) * 100).toFixed(2)

      const totalProgress = progress + overEstimate
      if (totalProgress > maxProgress) maxProgress = totalProgress

      progressGraphData.push({ progress, overEstimate, description })
    }
  })

  let progressGraphHeight: number | string = progressGraphData.length * 50
  if (progressGraphHeight < 200) progressGraphHeight = '100%'

  const progressChartMax = Math.ceil((Math.max(100, maxProgress) + 1) / 10) * 10
  // prettier-ignore
  const progressChartIntervalCount = (progressChartMax / 10) + 1

  return (
    <section className={`${className}`}>
      <h2 className={`text-xl sticky inset-x-0`}>Detailed Task analysis</h2>

      <section className={`my-4`}>
        <h3 className={`text-lg `}>Of Started Tasks</h3>

        <div className={`relative overflow-x-auto my-4 py-2`}>
          <ResponsiveContainer height={'100%'} maxHeight={300} aspect={1} width={taskList.length * 50}>
            <BarChart data={timeGraphData} margin={{ left: 25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" interval={0} />
              <YAxis tickFormatter={secondsToHHMMSS} />
              <Legend />
              <Tooltip
                content={
                  <CustomTooltip
                    mainNode={(dataPoint) => {
                      const dp = dataPoint as (typeof timeGraphData)[number]
                      return <p>{dp.description}</p>
                    }}
                    tickNode={(tick) => secondsToHHMMSS(tick.value ? +tick.value : 0)}
                  />
                }
              />
              <Bar dataKey="timeTaken" stackId="a" fill="#8884d8" />
              <Bar dataKey="timeSaved" stackId="a" fill="#82ca9d" />
              <Bar dataKey="timeLeft" stackId="a" fill="#d1f532" />
              <Bar dataKey="overTime" stackId="a" fill="#F03C3D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h3 className={`text-lg `}>Of Completed Tasks</h3>

        <ul className={`list-disc ml-8`}>
          <li>
            {tasksInTimeCount} <span className={`text-sm`}>({((tasksInTimeCount / startedTasks.length) * 100).toFixed(2)}%)</span> - Were Done In Time
          </li>
          <li>
            {tasksOverTimeCount} <span className={`text-sm`}>({((tasksOverTimeCount / startedTasks.length) * 100).toFixed(2)}%)</span> - Were Over
            Time
          </li>
          <li>
            {tasksUnderTimeCount} <span className={`text-sm`}>({((tasksUnderTimeCount / startedTasks.length) * 100).toFixed(2)}%)</span> - Were Under
            Time
          </li>
        </ul>
      </section>

      <section className={`my-4`}>
        <h3 className={`text-lg`}>Of Doing Tasks</h3>

        <div className={`relative overflow-x-auto my-4 py-2`}>
          <ResponsiveContainer height={progressGraphHeight} minHeight={200} width={progressChartIntervalCount * 35}>
            <BarChart data={progressGraphData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickCount={progressChartIntervalCount} interval={0} domain={[0, progressChartMax]} padding={{ right: 10 }} />
              <YAxis dataKey={'progress'} type="category" tickFormatter={(val: string) => `${val}%`} />
              <Legend />
              <Tooltip
                content={
                  <CustomTooltip
                    mainNode={(dataPoint) => {
                      const dp = dataPoint as (typeof timeGraphData)[number]
                      return <p>{dp.description}</p>
                    }}
                    tickNode={(tick) => `${tick.value ? tick.value.toString() : 0}%`}
                  />
                }
              />
              <Bar dataKey="progress" stackId="a" barSize={30} fill="#8884d8" />
              <Bar dataKey="overEstimate" stackId="a" barSize={30} fill="#F03C3D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </section>
  )
}

export default memo(TasksDetail)
