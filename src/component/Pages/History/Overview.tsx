import { FC, memo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Task } from '../../../model/Task'
import { COLORS, RADIAN } from '../../../constants'

interface OverviewProps {
  tasks: Task[]
  className?: string
}

const LABELS = {
  done: 'Completed',
  doing: 'Were Doing',
  todo: 'Not Started',
}

const Overview: FC<OverviewProps> = ({ tasks, className }) => {
  const listsData = (['done', 'doing', 'todo'] as const).map((type) => {
    const list = tasks.filter((t) => t.type === type)
    return { list, color: COLORS[type], label: LABELS[type], val: list.length }
  })

  return (
    <section className={className}>
      <h2 className={`text-xl `}>Overview</h2>

      <h3 className={`mt-2`}>
        Total Tasks: <span className={`text-lg`}>{tasks.length}</span>
      </h3>

      <p className={`text-center my-1`}>Out of which</p>

      <div className={`flex text-primary-12 font-medium text-center gap-x-2`}>
        {listsData.map((data) => (
          <h3 className={`px-3 py-1.5 rounded-xl flex-1`} style={{ background: data.color }} key={data.label}>
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
                <text x={x} y={y} fill="#3D3D3D" textAnchor={'middle'} className={`text-2xl font-semibold `} dominantBaseline="central">
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
