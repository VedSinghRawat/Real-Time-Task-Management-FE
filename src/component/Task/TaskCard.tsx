import { FC, memo, useEffect, useRef } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import TaskTimer from './TaskTimer'
import { Task } from '../../entities'
import TaskSelectors from '../../state/selector/task.selector'
import { useAppStore } from '../../state/store'

interface TaskCardProps {
  task: Task
  className?: string
}

const TaskCard: FC<TaskCardProps> = ({ task, className = '' }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const taskRemove = useAppStore(TaskSelectors.base.delete)

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
      className={`${className} relative rounded-xl bg-primary-4 group p-2.5 transition-all duration-100 ease-in-out outline outline-2 outline-secondary-8`}
    >
      <div className={`flex absolute -right-3 -top-4 z-10 gap-x-2`}>
        <AiFillDelete className={`p-1 w-7 h-7 rounded-full cursor-pointer bg-red text-secondary-12`} onClick={() => taskRemove(task.id)} />
      </div>

      <p className={`overflow-auto max-h-28 text-sm bg-transparent group-focus-within:outline-primary-2 sm:text-base`}>{formattedDescription}</p>

      <TaskTimer task={task} />
    </div>
  )
}

export default memo(TaskCard)
