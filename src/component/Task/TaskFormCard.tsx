import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { HiXCircle } from 'react-icons/hi'
import TextArea from '../UI/Form/TextArea'
import Button from '../UI/Button'
import { HHMMSSToSeconds, TimeString } from '../../utils'
import TimeInput from '../UI/Form/Input/TimeInput'
import { Task } from '../../model/Task'
import { taskFormActions } from '../../state/selector/task.selector'
import { useTaskStore } from '../../state/store/task.store'

type TaskFormCardProps = {
  className?: string
  task?: Task
  onClose?: () => void
}

const TaskFormCard: FC<TaskFormCardProps> = ({ task, className = '', onClose }) => {
  const [onAdd, onUpdate] = useTaskStore(taskFormActions)
  const [timerValue, setTimerValue] = useState<TimeString | undefined>()

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = useCallback(() => {
    if (timerValue) {
      const timerInSeconds = HHMMSSToSeconds(timerValue)

      if (timerInSeconds) {
        task
          ? onUpdate(task.id, { description: textAreaRef.current?.value || '', estimatedTime: timerInSeconds })
          : onAdd({ description: textAreaRef.current?.value || '', estimatedTime: timerInSeconds })

        onClose && onClose()
      }
    }
  }, [onAdd, onUpdate, timerValue, onClose, task])

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef])

  return (
    <div
      className={`relative text-sm sm:text-base rounded-xl bg-primary-dark group ${className} focus-within:bg-tertiary-medium p-2.5 transition-all duration-100 ease-in-out text-tertiary-normal  focus-within:text-secondary-dark`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <TextArea setRef={textAreaRef} className={`bg-transparent group-focus-within:outline-primary-medium `} />

        <div className={`relative mt-4 gap-x-4 flex`}>
          <TimeInput
            getValue={setTimerValue}
            containerClasses="w-full outline-[3px] outline-secondary-normal outline group-focus-within:outline-primary-dark rounded-md"
            className={`bg-transparent placeholder-secondary-light placeholder-opacity-70 group-focus-within:placeholder-secondary-dark`}
          />

          <Button type="submit" className={`group-focus-within:outline-primary-medium group-focus-within:text-primary-medium`} onClick={handleSubmit}>
            {task ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>

      <HiXCircle
        className={`absolute cursor-pointer w-7 h-7 -top-3.5 -right-3.5 bg-tertiary-light rounded-full group-focus-within:bg-primary-dark text-secondary-normal  focus-within:text-tertiary-dark`}
        onClick={onClose}
      />
    </div>
  )
}

export default memo(TaskFormCard)
