import { memo, useEffect, useRef, useState } from 'react'
import { HiXCircle } from 'react-icons/hi'
import TextArea from '../UI/Form/TextArea'
import Button from '../UI/Button'
import { HHMMSSToSeconds, TimeString } from '../../utils'
import TimeInput from '../UI/Form/Input/TimeInput'

type TaskFormCardProps<T extends Task | undefined = undefined> = {
  task: T
  onClose: () => void
} & (T extends Task
  ? {
      onAdd: (task: Omit<Task, 'id'>) => void
    }
  : {
      onUpdate: (task: Task) => void
    })

function TaskFormCard<T extends Task | undefined = undefined>(props: TaskFormCardProps<T>) {
  const { onClose, task } = props
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [timerValue, setTimerValue] = useState<TimeString | undefined>()

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef])

  return (
    <div
      className={`relative rounded-xl bg-primary-800 group w-fit focus-within:bg-secondary-600 p-4 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <TextArea setRef={textAreaRef} className={`bg-transparent group-focus-within:outline-primary-800 `} />

      <div className={`relative mt-4 gap-x-4 flex`}>
        <TimeInput
          getValue={setTimerValue}
          containerClasses="w-full outline-[3px] outline-secondary-400 outline group-focus-within:outline-primary-800 rounded-md"
          className={`bg-transparent placeholder-tertiary-300 placeholder-opacity-70 group-focus-within:placeholder-tertiary-800`}
        />

        <Button
          className={`group-focus-within:outline-primary-800 group-focus-within:text-primary-700`}
          onClick={() => {
            if (timerValue) {
              const timerInSeconds = HHMMSSToSeconds(timerValue)

              if (timerInSeconds) {
                if ('onAdd' in props) {
                  props.onAdd({ description: textAreaRef.current?.value || '', estimatedTime: timerInSeconds, elapsedTime: 0 })
                } else if (task) {
                  props.onUpdate({ description: textAreaRef.current?.value || '', estimatedTime: timerInSeconds, elapsedTime: 0, id: task.id })
                }
              }
            }
          }}
        >
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
