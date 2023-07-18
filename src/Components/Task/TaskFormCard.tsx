import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { HiXCircle } from 'react-icons/hi'
import TextArea from '../UI/Form/TextArea'
import Button from '../UI/Button'
import { HHMMSSToSeconds, TimeString } from '../../utils'
import TimeInput from '../UI/Form/Input/TimeInput'
import { useTaskStore } from '../../Store/task.store'
import { taskFormFunctionSelector } from '../../Store/task.selector'

type TaskFormCardProps = {
  className?: string
  task?: Task
  onClose?: () => void
}

const TaskFormCard: FC<TaskFormCardProps> = ({ task, className = '', onClose }) => {
  const [onAdd, onUpdate] = useTaskStore(taskFormFunctionSelector)
  const [timerValue, setTimerValue] = useState<TimeString | undefined>()

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = useCallback(() => {
    if (timerValue) {
      const timerInSeconds = HHMMSSToSeconds(timerValue)
      if (timerInSeconds) {
        task
          ? onUpdate(task.id, { description: textAreaRef.current?.value || '', estimatedTime: timerInSeconds })
          : onAdd({ description: textAreaRef.current?.value || '', estimatedTime: timerInSeconds, elapsedTime: 0 })

        onClose && onClose()
      }
    }
  }, [onAdd, onUpdate, timerValue])

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef])

  return (
    <div
      className={`relative rounded-xl bg-primary-800 group ${className} focus-within:bg-secondary-600 p-2.5 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <TextArea setRef={textAreaRef} className={`bg-transparent group-focus-within:outline-primary-800 `} />

      <div className={`relative mt-4 gap-x-4 flex`}>
        <TimeInput
          getValue={setTimerValue}
          containerClasses="w-full outline-[3px] outline-secondary-400 outline group-focus-within:outline-primary-800 rounded-md"
          className={`bg-transparent placeholder-tertiary-300 placeholder-opacity-70 group-focus-within:placeholder-tertiary-800`}
        />

        <Button className={`group-focus-within:outline-primary-800 group-focus-within:text-primary-700`} onClick={handleSubmit}>
          {task ? 'Update' : 'Add'}
        </Button>
      </div>

      <HiXCircle
        className={`absolute cursor-pointer w-7 h-7 -top-3.5 -right-3.5 bg-secondary-300 rounded-full group-focus-within:bg-primary-800`}
        onClick={onClose}
      />
    </div>
  )
}

export default memo(TaskFormCard)
