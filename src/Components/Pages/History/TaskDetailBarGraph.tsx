import { FC, memo } from 'react'

interface TaskDetailBarGraphProps {
  className?: string
}

const TaskDetailBarGraph: FC<TaskDetailBarGraphProps> = ({ className }) => {
  return (
    <section className={className}>
      <h2 className={`text-xl`}>Detailed Task analysis</h2>

      <p>bar graph showing time spent on individual tasks</p>
    </section>
  )
}

export default memo(TaskDetailBarGraph)
