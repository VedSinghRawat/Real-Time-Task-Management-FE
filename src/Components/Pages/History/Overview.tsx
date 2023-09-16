import { FC, memo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Task } from '../../../Model/Task'

interface OverviewProps {
  tasks: Task[]
}

const RADIAN = Math.PI / 180

const COLORS = {
  done: '#0FFF95',
  doing: '#FEE12B',
  todo: '#F03C3D',
}

const LABELS = {
  done: 'Completed',
  doing: 'Were Doing',
  todo: 'Not Started',
}

const Overview: FC<OverviewProps> = ({ tasks }) => {
  const listsData = (['done', 'doing', 'todo'] as const).map((type) => {
    const list = tasks.filter((t) => t.type === type)
    return { list, color: COLORS[type], label: LABELS[type], val: list.length }
  })

  return (
    <section>
      <h2 className={`text-xl `}>Overview</h2>

      <h3 className={`mt-2`}>
        Total Tasks: <span className={`text-lg`}>{tasks.length}</span>
      </h3>

      <p className={`text-center my-1`}>Out of which</p>

      <div className={`flex text-black text-center gap-x-2`}>
        {listsData.map((data) => (
          <h3 className={`px-3 py-1.5 rounded-xl flex-1`} style={{ background: data.color }}>
            {data.label}: {data.list.length}
          </h3>
        ))}
      </div>

      <ResponsiveContainer aspect={1} className={`max-w-xs mx-auto`}>
        <PieChart className={`w-1/2 h-1/2`}>
          <Pie
            dataKey={'val'}
            data={listsData}
            label={(data: { cy: number; cx: number; innerRadius: number; outerRadius: number; midAngle: number; percent: number }) => {
              const { cx, cy, innerRadius, midAngle, outerRadius, percent } = data

              const radius = innerRadius + (outerRadius - innerRadius) * 0.5
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)

              return (
                <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              )
            }}
            labelLine={false}
            cy={'50%'}
            cx={'50%'}
          >
            {listsData.map(({ color }) => {
              return <Cell key={`cell-${color}`} fill={color} />
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </section>
  )
}

export default memo(Overview)