import { FC, memo, useEffect, useMemo, useRef } from 'react'
import Timer from '../UI/Timer'
import { useTaskStore } from '../../Store/task.store'
import { taskSetTimerSelector } from '../../Store/task.selector'

interface TaskCardProps {
  task: Task
  className?: string
  increaseTimerBy?: number
  decreaseTimerBy?: number
}

const TaskCard: FC<TaskCardProps> = ({ task, className, increaseTimerBy = 60, decreaseTimerBy = 60 }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [inc, dec] = useTaskStore(taskSetTimerSelector)

  const [increaseTimer, decreaseTimer] = useMemo(() => [() => inc(task.id, increaseTimerBy), () => dec(task.id, decreaseTimerBy)], [])

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef])

  return (
    <div
      className={`${className} relative rounded-xl bg-primary-800 group focus-within:bg-secondary-600 p-4 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <p className={`bg-transparent group-focus-within:outline-primary-800 `}>{task.description}</p>

      <Timer
        active={task.active}
        className={`w-fit ml-auto`}
        timeInSeconds={task.estimatedTime}
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
      />
    </div>
  )
}

export default memo(TaskCard)
