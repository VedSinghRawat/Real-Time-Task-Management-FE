import { FC, memo, useEffect, useRef } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import TaskTimer from './TaskTimer'
import { Task } from '../../model/Task'
import { taskRemoveActionSelector } from '../../state/selector/task.selector'
import { useTaskStore } from '../../state/store/task.store'

interface TaskCardProps {
  task: Task
  className?: string
}

const TaskCard: FC<TaskCardProps> = ({ task, className = '' }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const taskRemove = useTaskStore(taskRemoveActionSelector)

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
      className={`${className} relative rounded-xl bg-primary-medium group p-2.5 transition-all duration-100 ease-in-out text-secondary-medium outline outline-2 outline-tertiary-normal`}
    >
      <div className={`absolute -top-3 -right-2 flex gap-x-2 z-10`}>
        <AiFillDelete
          className={`bg-secondary-dark text-tertiary-light p-[0.15rem] rounded-full h-5 w-5 cursor-pointer`}
          onClick={() => taskRemove(task.id)}
        />
      </div>

      <p className={`bg-transparent group-focus-within:outline-primary-dark text-sm sm:text-base max-h-28 overflow-auto`}>{formattedDescription}</p>

      <TaskTimer task={task} />
    </div>
  )
}

export default memo(TaskCard)
