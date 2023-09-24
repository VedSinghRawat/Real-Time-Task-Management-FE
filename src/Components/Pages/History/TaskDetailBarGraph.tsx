import { FC, memo } from 'react'
import { Task } from '../../../Model/Task'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { secondsToHHMMSS } from '../../../utils'

interface TaskDetailBarGraphProps {
  taskList: Task[]
  className?: string
}

const CustomTooltip: TooltipProps<ValueType, NameType>['content'] = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const taskData = payload[0].payload as { description: string; timeLeft: number; overTime: number; timeTaken: number }

    return (
      <div className="max-w-[15rem] bg-primary-500 bg-opacity-80 p-2 text-secondary-500 rounded-sm">
        <div className={`grid grid-cols-2 gap-x-2`}>
          {payload.map((props) => {
            return props.dataKey ? (
              <p key={props.color} style={{ color: props.color }}>
                {secondsToHHMMSS(+taskData[props.dataKey as keyof typeof taskData])}
              </p>
            ) : (
              <></>
            )
          })}
        </div>

        <p className="text-sm">{taskData.description}</p>
      </div>
    )
  }

  return null
}

const TaskDetailBarGraph: FC<TaskDetailBarGraphProps> = ({ className = '', taskList }) => {
  const startedTasks = taskList.filter((t) => t.type !== 'todo')

  let tasksUnderTimeCount = 0
  let tasksOverTimeCount = 0
  let tasksInTimeCount = 0

  const mainGraphData: {
    description: string
    type: 'todo' | 'doing' | 'done'
    timeLeft: number
    timeSaved: number
    overTime: number
    timeTaken: number
  }[] = []

  startedTasks.forEach(({ description, type, estimatedTime, overTime, timeLeft }) => {
    const timeTaken = estimatedTime - timeLeft

    if (type === 'done') {
      if (timeLeft > 0) tasksUnderTimeCount++
      else if (overTime !== 0) tasksOverTimeCount++
      else tasksInTimeCount++
    }

    mainGraphData.push({
      description,
      type,
      timeLeft: type === 'done' ? 0 : timeLeft,
      timeSaved: type === 'done' ? timeLeft : 0,
      overTime,
      timeTaken,
    })
  })

  return (
    <section className={`${className}`}>
      <h2 className={`text-xl sticky inset-x-0`}>Detailed Task analysis</h2>

      <div className={`my-4`}>
        <h3 className={`text-lg `}>Of Started Tasks</h3>

        <div className={`relative overflow-x-auto my-4 py-2`}>
          <ResponsiveContainer height={'100%'} maxHeight={300} aspect={1} width={taskList.length * 50}>
            <BarChart data={mainGraphData} margin={{ left: 25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis tickFormatter={secondsToHHMMSS} />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="timeTaken" stackId="a" fill="#8884d8" />
              <Bar dataKey="timeSaved" stackId="a" fill="#82ca9d" />
              <Bar dataKey="timeLeft" stackId="a" fill="#d1f532" />
              <Bar dataKey="overTime" stackId="a" fill="#F03C3D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
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
      </div>

      <div className={`my-4`}>
        <h3 className={`text-lg`}>Of Doing Tasks</h3>

        <div className={`relative overflow-x-auto my-4 py-2`}>
          <ResponsiveContainer height={'100%'} maxHeight={300} aspect={1} width={taskList.length * 50}>
            <BarChart data={mainGraphData} margin={{ left: 25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis />
              <YAxis dataKey="type" />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="progress" stackId="a" fill="#F03C3D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default memo(TaskDetailBarGraph)
