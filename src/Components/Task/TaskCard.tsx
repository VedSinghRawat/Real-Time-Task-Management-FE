import { FC, memo, useEffect, useMemo, useRef } from 'react'
import Timer from '../UI/Timer'
import { useTaskStore } from '../../Store/task.store'
import { taskSetTimerActions, taskUpdateAction } from '../../Store/task.selector'
import { AiFillDelete } from 'react-icons/ai'

interface TaskCardProps {
  task: Task
  className?: string
  increaseTimerBy?: number
  decreaseTimerBy?: number
}

const TaskCard: FC<TaskCardProps> = ({ task, className, increaseTimerBy = 60, decreaseTimerBy = 60 }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [inc, dec] = useTaskStore(taskSetTimerActions)
  const taskUpdate = useTaskStore(taskUpdateAction)

  const [increaseTimer, decreaseTimer] = useMemo(() => [() => inc(task.id, increaseTimerBy), () => dec(task.id, decreaseTimerBy)], [])

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef])

  const descriptionLines = task.description.split('\n')

  const formattedDescription = descriptionLines.map((line, i) => (
    <span key={i}>
      {line} {i < descriptionLines.length - 1 && <br />}
    </span>
  ))

  return (
    <div
      className={`${className} relative rounded-xl bg-primary-800 group focus-within:bg-secondary-600 p-2.5 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <AiFillDelete className={`absolute bg-secondary-300 p-[1px] rounded-full sm:h-5 sm:w-5  -top-2 -right-1 cursor-pointer`} />

      <p className={`bg-transparent group-focus-within:outline-primary-800 text-sm sm:text-base`}>{formattedDescription}</p>

      <Timer
        active={task.type === 'doing'}
        onTimeChange={(newTime) => taskUpdate(task.id, { timeLeft: newTime })}
        className={`w-fit ml-auto`}
        timeInSeconds={task.timeLeft || task.estimatedTime}
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
      />
    </div>
  )
}

export default memo(TaskCard)
