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
        <div className={`flex gap-x-2`}>
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
  const graphData = taskList
    .filter((t) => t.type !== 'todo')
    .map(({ description, estimatedTime, overTime, timeLeft }) => {
      return {
        description,
        timeLeft,
        overTime,
        timeTaken: estimatedTime - timeLeft,
      }
    })

  return (
    <section className={`${className} relative overflow-x-auto`}>
      <h2 className={`mb-3 text-xl sticky inset-x-0`}>Detailed Task analysis</h2>

      <ResponsiveContainer height={'100%'} maxHeight={300} aspect={1} width={taskList.length * 50}>
        <BarChart data={graphData} margin={{ left: 25 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="minDescription" />
          <YAxis tickFormatter={secondsToHHMMSS} />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="timeTaken" stackId="a" fill="#8884d8" />
          <Bar dataKey="timeLeft" stackId="a" fill="#82ca9d" />
          <Bar dataKey="overTime" stackId="a" fill="#F03C3D" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}

export default memo(TaskDetailBarGraph)
