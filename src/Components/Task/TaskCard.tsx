import { FC, memo, useEffect, useRef } from 'react'
import Timer from '../UI/Timer'

interface TaskCardProps {
  task: Task
  active: boolean
  increaseTimer: () => void
  decreaseTimer: () => void
}

const TaskCard: FC<TaskCardProps> = ({ task, active, decreaseTimer, increaseTimer }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef])

  return (
    <div
      className={`relative rounded-xl bg-primary-800 group w-fit focus-within:bg-secondary-600 p-4 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <p className={`bg-transparent group-focus-within:outline-primary-800 `}>{task.description}</p>

      <Timer
        active={active}
        className={`w-fit ml-auto`}
        timeInSeconds={task.estimatedTime}
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
      />
    </div>
  )
}

export default memo(TaskCard)
