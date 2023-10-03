import { FC, memo } from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Cell, Pie, PieChart, Bar, BarChart } from 'recharts'
import { useTaskStore } from '../Store/task.store'
import { taskListLastWeekSelector } from '../Store/task.selector'
import { COLORS, RADIAN } from '../constants'
import { CustomTooltip } from '../Components/UI/CustomTooltip'
import { secondsToHHMMSS } from '../utils'
import { format, subDays } from 'date-fns'

interface DashboardProps {}

const LABELS = {
  done: 'Done',
  todo: 'Not Done',
}

const Dashboard: FC<DashboardProps> = () => {
  const taskList = useTaskStore(taskListLastWeekSelector)

  const activityData = [
    { day: 'Sunday', done: 0, notDone: 0, timeSpent: 0 },
    { day: 'Monday', done: 0, notDone: 0, timeSpent: 0 },
    { day: 'Tuesday', done: 0, notDone: 0, timeSpent: 0 },
    { day: 'Wednesday', done: 0, notDone: 0, timeSpent: 0 },
    { day: 'Thursday', done: 0, notDone: 0, timeSpent: 0 },
    { day: 'Friday', done: 0, notDone: 0, timeSpent: 0 },
    { day: 'Saturday', done: 0, notDone: 0, timeSpent: 0 },
  ]

  const radialGraphData = (['done', 'todo'] as const).map((type) => {
    return { label: LABELS[type], color: COLORS[type], val: 0 }
  })

  for (let i = new Date().getDay(); i > 0; i--) {
    const temp = activityData.shift()
    temp && activityData.push(temp)
  }

  taskList.forEach((t) => {
    const day = t.created_at.getDay()

    const curr = activityData[day]

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

  return (
    <section className={`max-w-[100vw] px-4 py-7 text-secondary-700`}>
      <h2 className={`text-2xl `}>Weekly Report</h2>

      <section className={`mt-6`}>
        <h3 className={`text-xl`}>Overview</h3>

        <div className={`mt-4 relative overflow-x-auto`}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart width={500} height={300} data={activityData} margin={{ right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis interval={0} dataKey="day" tickSize={10} tickFormatter={(day: string) => day.substring(0, 3)} />
              <YAxis />
              <Tooltip
                content={
                  <CustomTooltip
                    mainNode={(dataPoint) => (
                      <p>
                        {dataPoint.day} ({format(subDays(new Date(), 7 - activityData.findIndex((d) => d.day === dataPoint.day)), 'dd-MM-yyyy')})
                      </p>
                    )}
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

        <div className={`mt-4`}>
          <ResponsiveContainer width={'100%'} height={250}>
            <BarChart data={activityData} margin={{ left: 22, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis interval={0} dataKey="day" tickSize={10} tickFormatter={(day: string) => day.substring(0, 3)} />
              <YAxis tickFormatter={secondsToHHMMSS} />
              <Legend />
              <Tooltip
                content={
                  <CustomTooltip
                    mainNode={(dataPoint) => (
                      <p>
                        {dataPoint.day} ({format(subDays(new Date(), 7 - activityData.findIndex((d) => d.day === dataPoint.day)), 'dd-MM-yyyy')})
                      </p>
                    )}
                    tickNode={(tick) => secondsToHHMMSS(+tick.value! || 0)}
                  />
                }
              />
              <Bar dataKey="timeSpent" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={`mt-6`}>
        <h3 className={`text-xl `}>Totals</h3>

        <div className={`text-lg text-secondary-300 flex items-center`}>
          <div>
            {radialGraphData.map((data) => {
              return (
                <p className={`px-3 py-1.5 mb-4 rounded-xl flex-1 `} style={{ background: data.color }}>
                  {data.label}: {data.val}
                </p>
              )
            })}
          </div>

          <div className={`grow`}>
            <ResponsiveContainer aspect={1} className={`max-w-xs mx-auto`}>
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
        </div>
      </section>
    </section>
  )
}

export default memo(Dashboard)
