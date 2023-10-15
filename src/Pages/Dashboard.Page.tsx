import { FC, memo, useState } from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Cell, Pie, PieChart, Bar, BarChart } from 'recharts'
import { useTaskStore } from '../Store/task.store'
import { taskListLastMonthSelector, taskListLastSixMonthsSelector, taskListLastWeekSelector } from '../Store/task.selector'
import { COLORS, RADIAN } from '../constants'
import { CustomTooltip } from '../Components/UI/CustomTooltip'
import { secondsToHHMMSS } from '../utils'
import { format, subDays } from 'date-fns'
import { Task } from '../Model/Task'
import Listbox from '../Components/UI/Form/Listbox'

interface DashboardProps {}

const LABELS = {
  done: 'Done',
  todo: 'Not Done',
}

const TIME_FRAME = ['Weekly', 'Monthly', 'Half-Yearly'] as const
const TIME_FRAME_OPTS = TIME_FRAME.map((tf) => ({ id: tf, label: tf, value: tf }))
type TimeFrame = (typeof TIME_FRAME)[number]

const getGraphFormattedData = (
  type: TimeFrame,
  taskList: Task[],
  radialGraphData: {
    label: string
    color: string
    val: number
  }[]
) => {
  switch (type) {
    case 'Weekly': {
      const data = [
        { label: 'Sunday', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'Monday', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'Tuesday', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'Wednesday', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'Thursday', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'Friday', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'Saturday', done: 0, notDone: 0, timeSpent: 0 },
      ]
      for (let i = new Date().getDay(); i > 0; i--) {
        const temp = data.shift()
        temp && data.push(temp)
      }

      taskList.forEach((t) => {
        const day = t.created_at.getDay()

        const curr = data[day]

        if (curr) {
          if (t.type === 'done') {
            radialGraphData[0]!.val++
            curr.done++
          } else {
            radialGraphData[1]!.val++
            curr.notDone++
          }
          curr.timeSpent += t.overTime + (t.estimatedTime - t.timeLeft)
        }
      })

      return data
    }

    case 'Monthly': {
      return []
    }

    case 'Half-Yearly': {
      return []
    }

    default:
      return []
  }
}

const Dashboard: FC<DashboardProps> = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('Weekly')

  const taskListLastWeek = useTaskStore(taskListLastWeekSelector)
  const taskListLastMonth = useTaskStore(taskListLastMonthSelector)
  const taskListLastSixMonths = useTaskStore(taskListLastSixMonthsSelector)

  const timeTypeToListMap = {
    'Half-Yearly': taskListLastSixMonths,
    'Monthly': taskListLastMonth,
    'Weekly': taskListLastWeek,
  } as const

  const taskList = timeTypeToListMap[timeFrame]

  const radialGraphData = (['done', 'todo'] as const).map((type) => {
    return { label: LABELS[type], color: COLORS[type], val: 0 }
  })

  const graphData = getGraphFormattedData(timeFrame, taskList, radialGraphData)

  return (
    <section className={`max-w-[100vw] px-4 py-7 text-secondary-700`}>
      <h2 className={`text-2xl flex items-center gap-x-2`}>
        <Listbox showNoneOpt={false} options={TIME_FRAME_OPTS} defaultSelected={TIME_FRAME_OPTS[0]} onChange={setTimeFrame} /> Report
      </h2>

      <section className={`mt-6`}>
        <h3 className={`text-xl`}>Overview</h3>

        <div className={`my-4`}>
          <h4>Tasks Done</h4>

          <div className={`mt-4 relative overflow-x-auto`}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart width={500} height={300} data={graphData} margin={{ right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis interval={0} dataKey="label" tickSize={10} tickFormatter={(day: string) => day.substring(0, 3)} />
                <YAxis />
                <Tooltip
                  content={
                    <CustomTooltip
                      mainNode={(dataPoint: (typeof graphData)[number]) =>
                        `${dataPoint.label} (${format(
                          subDays(new Date(), 7 - graphData.findIndex((d) => d.label === dataPoint.label)),
                          'dd-MM-yyyy'
                        )})`
                      }
                      tickNode={(tick) => {
                        return tick.dataKey && tick.value ? `${tick.dataKey}: ${tick.value.toString()}` : ''
                      }}
                    />
                  }
                />
                <Legend />
                <Line dataKey="done" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line dataKey="notDone" stroke="#F03C3D" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4>Time spent</h4>

          <div className={`mt-4`}>
            <ResponsiveContainer width={'100%'} height={250}>
              <BarChart data={graphData} margin={{ left: 22, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis interval={0} dataKey="day" tickSize={10} tickFormatter={(day: string) => day.substring(0, 3)} />
                <YAxis tickFormatter={secondsToHHMMSS} />
                <Legend />
                <Tooltip
                  content={
                    <CustomTooltip
                      mainNode={(dataPoint: (typeof graphData)[number]) =>
                        `${dataPoint.label} (${format(
                          subDays(new Date(), 7 - graphData.findIndex((d) => d.label === dataPoint.label)),
                          'dd-MM-yyyy'
                        )})`
                      }
                      tickNode={(tick) => secondsToHHMMSS(+tick.value! || 0)}
                    />
                  }
                />
                <Bar dataKey="timeSpent" stackId="a" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className={`mt-6`}>
        <h3 className={`text-xl `}>Totals</h3>

        <div className={`text-lg text-secondary-300 flex items-center  w-full`}>
          <div className={`shrink-0`}>
            {radialGraphData.map((data) => {
              return (
                <p className={`px-3 py-1.5 mb-4 rounded-xl flex-1 `} style={{ background: data.color }}>
                  {data.label}: {data.val}
                </p>
              )
            })}
          </div>

          <ResponsiveContainer aspect={1} width={'100%'} height={250} className={`max-w-xs mx-auto`}>
            <PieChart className={`w-1/2 h-1/2`}>
              <Pie
                dataKey={'val'}
                data={radialGraphData}
                label={(data: { cy: number; cx: number; innerRadius: number; outerRadius: number; midAngle: number; percent: number }) => {
                  const { cx, cy, innerRadius, midAngle, outerRadius, percent } = data

                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text x={x} y={y} fill="#F5F4F6" textAnchor={'middle'} className={`text-2xl font-semibold `} dominantBaseline="central">
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  )
                }}
                innerRadius={'50%'}
                labelLine={false}
                cy={'50%'}
                cx={'50%'}
              >
                {radialGraphData.map(({ color }) => {
                  return <Cell key={`cell-${color}`} fill={color} />
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={`mt-6`}></section>
    </section>
  )
}

export default memo(Dashboard)
