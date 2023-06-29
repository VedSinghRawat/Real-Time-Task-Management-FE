import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { HiXCircle } from 'react-icons/hi'
import TextArea from '../UI/Form/TextArea'
import Button from '../UI/Button'
import { HHMMSSToSeconds, TimeString } from '../../utils'
import Timer from '../UI/Timer'
import TimeInput from '../UI/Form/Input/TimeInput'

interface TaskCardProps {
  task: Task
  active: boolean
  setTaskTimer: (newEstimatedTime: number) => void
  increaseTimer: () => void
  decreaseTimer: () => void
}

const TaskCard: FC<TaskCardProps> = ({ task, active, decreaseTimer, increaseTimer, setTaskTimer }) => {
  const [isTimerInputOpen, setIsTimerInputOpen] = useState(task.estimatedTime === 0)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [timerValue, setTimerValue] = useState<TimeString | undefined>()

  const toggleTimerInput = useCallback(() => {
    setIsTimerInputOpen((curr) => !curr)
  }, [])

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef, isTimerInputOpen])

  return (
    <div
      className={`relative rounded-xl bg-primary-800 group w-fit focus-within:bg-secondary-600 p-4 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <TextArea setRef={textAreaRef} className={`bg-transparent group-focus-within:outline-primary-800 `} />

      {task.estimatedTime === 0 ? (
        <div className={`relative mt-4 gap-x-4 flex ${task.estimatedTime === undefined ? 'mb-4' : ''} ${!isTimerInputOpen ? 'hidden' : ''}`}>
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

                timerInSeconds && setTaskTimer(timerInSeconds)
              }
            }}
          >
            Confirm
          </Button>
        </div>
      ) : (
        <Timer
          active={active}
          className={`w-fit ml-auto`}
          timeInSeconds={task.estimatedTime}
          increaseTimer={increaseTimer}
          decreaseTimer={decreaseTimer}
        ></Timer>
      )}

      <HiXCircle
        className={`absolute cursor-pointer w-7 h-7 -top-3.5 -right-3.5 bg-secondary-300 rounded-full group-focus-within:bg-primary-800`}
        onClick={toggleTimerInput}
      />
    </div>
  )
}

export default memo(TaskCard)
