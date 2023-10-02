import { FC, memo } from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { useTaskStore } from '../Store/task.store'
import { taskListLastWeekSelector } from '../Store/task.selector'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const taskList = useTaskStore(taskListLastWeekSelector)

  const activityData = [
    { day: 'Sunday', done: 0, notDone: 0 },
    { day: 'Monday', done: 0, notDone: 0 },
    { day: 'Tuesday', done: 0, notDone: 0 },
    { day: 'Wednesday', done: 0, notDone: 0 },
    { day: 'Thursday', done: 0, notDone: 0 },
    { day: 'Friday', done: 0, notDone: 0 },
    { day: 'Saturday', done: 0, notDone: 0 },
  ]

  for (let i = new Date().getDay(); i > 0; i--) {
    const temp = activityData.shift()
    temp && activityData.push(temp)
  }

  taskList.forEach((t) => {
    const day = t.created_at.getDay()

    const curr = activityData[day]

    if (curr) {
      if (t.type === 'done') curr.done++
      else curr.notDone++
    }
  })

  return (
    <div className={`max-w-[100vw]`}>
      <section className={`px-4 py-7 text-secondary-700`}>
        <h1 className={`text-2xl`}>Activity Report</h1>

        <div className={`mt-4 relative overflow-x-auto`}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart width={500} height={300} data={activityData} margin={{ right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis interval={0} dataKey="day" tickSize={10} tickFormatter={(day: string) => day.substring(0, 3)} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="done" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line dataKey="notDone" stroke="#F03C3D" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}

export default memo(Dashboard)
