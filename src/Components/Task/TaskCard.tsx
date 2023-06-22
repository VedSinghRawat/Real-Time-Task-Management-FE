import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { GoXCircleFill } from 'react-icons/go'
import TextArea from '../UI/Form/TextArea'
import Input from '../UI/Form/Input'
import Button from '../UI/Button'
import { HHMMSSToSeconds } from '../../utils'
import Timer from '../UI/Timer'

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
  const [timerError, setTimerError] = useState('')

  const toggleTimerInput = useCallback(() => {
    setIsTimerInputOpen((curr) => !curr)
  }, [])

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef, isTimerInputOpen])

  return (
    <div
      className={`relative rounded-xl bg-primary-800 group w-60 focus-within:bg-secondary-600 p-4 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <TextArea setRef={textAreaRef} className={`bg-transparent group-focus-within:outline-primary-800 `} />

      {task.estimatedTime === 0 ? (
        <div className={`relative mt-4 gap-x-4 flex ${task.estimatedTime === undefined ? 'mb-4' : ''} ${!isTimerInputOpen ? 'hidden' : ''}`}>
          <Input
            className={`w-full bg-transparent group-focus-within:outline-primary-800 placeholder-tertiary-600 group-focus-within:placeholder-tertiary-800`}
            placeholder="HH:MM:SS"
          />

          <Button
            className={`group-focus-within:outline-primary-800 group-focus-within:text-primary-700`}
            onClick={() => {
              if (textAreaRef.current) {
                const timerInSeconds = HHMMSSToSeconds(textAreaRef.current.value)

                if (timerInSeconds === undefined) {
                  setTimerError('Format should be HH:MM:SS')
                } else {
                  setTimerError('')
                  setTaskTimer(timerInSeconds)
                }
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

      <GoXCircleFill
        className={`absolute cursor-pointer w-6 h-6 -top-3 -right-3 bg-secondary-300 rounded-full group-focus-within:bg-primary-800`}
        onClick={toggleTimerInput}
      />

      <p className={`absolute bottom-1.5 text-sm`}>{timerError}</p>
    </div>
  )
}

export default memo(TaskCard)
