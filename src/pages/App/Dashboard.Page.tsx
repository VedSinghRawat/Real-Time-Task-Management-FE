import { FC, memo, useMemo, useState } from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Cell, Pie, PieChart, Bar, BarChart } from 'recharts'
import { useTaskStore } from '../../state/store/task.store'
import { taskListLastMonthSelector, taskListLastSixMonthsSelector, taskListLastWeekSelector } from '../../state/selector/task.selector'
import { COLORS, RADIAN } from '../../constants'
import { DAYS, TODAY } from '../../constants'
import { addDays, format, getDaysInMonth, isToday, subDays, subMonths } from 'date-fns'
import { Task } from '../../model/Task'
import { secondsToHHMMSS } from '../../utils'
import { useWindowSize } from '../../hooks/useWindowSize'
import { CustomTooltip } from '../../component/UI/CustomTooltip'
import Listbox from '../../component/UI/Form/Listbox'

interface DashboardProps {}

const LABELS = {
  done: 'Done',
  todo: 'Not Done',
}

const TIME_FRAME = ['Weekly', 'Monthly', 'Half-Yearly'] as const
const TIME_FRAME_OPTS = TIME_FRAME.map((tf) => ({ id: tf, label: tf, value: tf }))
type TimeFrame = (typeof TIME_FRAME)[number]

type GraphData = {
  label: string
  done: number
  notDone: number
  timeSpent: number
}

function updateGraphFigures(
  taskList: Task[],
  radialGraphData: { label: string; color: string; val: number }[],
  getRelatedDataPoint: (t: Task) => GraphData
) {
  taskList.forEach((t) => {
    const curr = getRelatedDataPoint(t)

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
}

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
      const data: GraphData[] = DAYS.map((label) => ({
        label,
        done: 0,
        notDone: 0,
        timeSpent: 0,
      }))

      updateGraphFigures(taskList, radialGraphData, (t) => data[t.created_at.getDay()]!)

      for (let i = TODAY.getDay(); i > 0; i--) {
        const temp = data.shift()
        temp && data.push(temp)
      }

      return data
    }

    case 'Monthly': {
      let initDate = subMonths(TODAY, 1)

      const todayDate = TODAY.getDate()
      const todayMonth = TODAY.getMonth()

      const prevMonthDays = getDaysInMonth(initDate)
      const shift = prevMonthDays - todayDate

      const data: GraphData[] = []

      while (true) {
        if (isToday(initDate)) break

        data.push({ label: format(initDate, 'do MMM'), done: 0, notDone: 0, timeSpent: 0 })
        initDate = addDays(initDate, 1)
      }

      updateGraphFigures(taskList, radialGraphData, (t) => {
        const date = t.created_at.getDate()
        const month = t.created_at.getMonth()

        const indx = month === todayMonth ? date + shift : date - todayDate
        return data[indx] || data[0]!
      })

      return data
    }

    case 'Half-Yearly': {
      const data = [
        { label: 'January', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'February', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'March', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'April', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'May', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'June', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'July', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'August', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'September', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'October', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'November', done: 0, notDone: 0, timeSpent: 0 },
        { label: 'December', done: 0, notDone: 0, timeSpent: 0 },
      ]

      updateGraphFigures(taskList, radialGraphData, (t) => data[t.created_at.getMonth()]!)

      return data.slice(TODAY.getMonth() - 6, TODAY.getMonth())
    }

    default:
      return []
  }
}

const radialGraphData = (['done', 'todo'] as const).map((type) => {
  return { label: LABELS[type], color: COLORS[type], val: 0 }
})

const Dashboard: FC<DashboardProps> = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('Weekly')

  const taskListLastWeek = useTaskStore(taskListLastWeekSelector)
  const taskListLastMonth = useTaskStore(taskListLastMonthSelector)
  const taskListLastSixMonths = useTaskStore(taskListLastSixMonthsSelector)

  const graphData = useMemo(() => {
    const timeTypeToListMap = {
      'Half-Yearly': taskListLastSixMonths,
      'Monthly': taskListLastMonth,
      'Weekly': taskListLastWeek,
    } as const

    const taskList = timeTypeToListMap[timeFrame]

    return getGraphFormattedData(timeFrame, taskList, radialGraphData)
  }, [taskListLastMonth, taskListLastSixMonths, taskListLastWeek, timeFrame])

  const { width } = useWindowSize()

  return (
    <section className={`max-w-[calc(100vw-3rem)] md:max-w-[calc(100vw-9rem)] mt-4 `}>
      <h2 className={`text-2xl flex items-center gap-x-2`}>
        <Listbox
          buttonClasses="text-2xl "
          showNoneOpt={false}
          options={TIME_FRAME_OPTS}
          defaultSelected={TIME_FRAME_OPTS[0]}
          onChange={setTimeFrame}
        />{' '}
        Report
      </h2>

      <section className={`mt-6 w-full`}>
        <h3 className={`text-xl`}>Overview</h3>

        <div className={`lg:flex w-full my-4`}>
          <div className={`my-4 lg:my-0 flex-1`}>
            <h4>Tasks Done</h4>

            <div className={`mt-4 relative overflow-x-auto`}>
              <ResponsiveContainer width={timeFrame === 'Monthly' ? graphData.length * 42 : width >= 1024 ? '95%' : '100%'} height={280}>
                <LineChart height={300} data={graphData} margin={{ right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    interval={0}
                    dataKey="label"
                    tickSize={10}
                    tickFormatter={(tick: string) => tick.substring(0, timeFrame === 'Monthly' ? 4 : 3)}
                  />
                  <YAxis />
                  <Tooltip
                    content={
                      <CustomTooltip
                        mainNode={(dataPoint: (typeof graphData)[number]) => {
                          return `${dataPoint.label} (${format(
                            timeFrame !== 'Half-Yearly'
                              ? subDays(
                                  TODAY,
                                  (timeFrame === 'Weekly' ? 7 : getDaysInMonth(TODAY) + 1) - graphData.findIndex((d) => d.label === dataPoint.label)
                                )
                              : TODAY,
                            'dd-MM-yyyy'
                          )})`
                        }}
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

          <div className={`overflow-x-auto flex-1`}>
            <h4>Time spent</h4>

            <div className={`mt-4`}>
              <ResponsiveContainer width={timeFrame === 'Monthly' ? graphData.length * 42 : '100%'} height={280}>
                <BarChart data={graphData} margin={{ left: 22, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis interval={0} dataKey="label" tickSize={10} tickFormatter={(day: string) => day.substring(0, 3)} />
                  <YAxis tickFormatter={secondsToHHMMSS} />
                  <Legend />
                  <Tooltip
                    content={
                      <CustomTooltip
                        mainNode={(dataPoint: (typeof graphData)[number]) =>
                          `${dataPoint.label} (${format(subDays(TODAY, 7 - graphData.findIndex((d) => d.label === dataPoint.label)), 'dd-MM-yyyy')})`
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
        </div>
      </section>

      <section className={`mt-6 -mb-6 md:mb-3`}>
        <h3 className={`text-xl `}>Totals</h3>

        <div className={`text-lg text-secondary-light flex items-center max-w-lg gap-x-8`}>
          <div className={`shrink-0`}>
            {radialGraphData.map((data) => {
              return (
                <p className={`px-3 py-1.5 mb-4 rounded-xl flex-1 `} style={{ background: data.color }}>
                  {data.label}: {data.val}
                </p>
              )
            })}
          </div>

          <ResponsiveContainer aspect={1} width={'100%'} className={`max-w-xs mx-auto`}>
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
    </section>
  )
}

export default memo(Dashboard)
