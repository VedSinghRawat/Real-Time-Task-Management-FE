import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { BsFillClockFill, BsXCircleFill } from 'react-icons/bs'
import TextArea from '../UI/Form/TextArea'
import Input from '../UI/Form/Input'
import Button from '../UI/Button'
import { HHMMSSToSeconds } from '../../utils'
import Timer from '../UI/Timer'

interface TaskCardProps {
  task: Task
  setTaskTimer: (newEstimatedTime: number) => void
}

const TaskCard: FC<TaskCardProps> = ({ task, setTaskTimer }) => {
  const [isTimerInputOpen, setIsTimerInputOpen] = useState(task.estimatedTime !== undefined)
  const inputRef = useRef<HTMLInputElement>(null)
  const [timerError, setTimerError] = useState('')

  const toggleTimerInput = useCallback(() => {
    setIsTimerInputOpen((curr) => !curr)
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef, isTimerInputOpen])

  console.log(task)

  return (
    <div
      className={`relative rounded-xl bg-primary-800 group w-60 focus-within:bg-secondary-600 p-4 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <TextArea className={`bg-transparent group-focus-within:outline-primary-800 `} />

      <div className={`mt-4 gap-x-4 flex ${task.estimatedTime === undefined ? 'mb-4' : ''}`}>
        {task.estimatedTime === undefined ? (
          <div className={`relative w-1/2 ${!isTimerInputOpen ? 'hidden' : ''}`}>
            <Input
              setRef={inputRef}
              className={`w-full bg-transparent group-focus-within:outline-primary-800 placeholder-tertiary-600 group-focus-within:placeholder-tertiary-800`}
              placeholder="HH:MM:SS"
            />

            <BsXCircleFill
              className={`absolute cursor-pointer w-5 h-5 -top-3 -right-3 bg-secondary-400 rounded-full group-focus-within:bg-primary-800`}
              onClick={toggleTimerInput}
            />
          </div>
        ) : (
          <Timer timeInSeconds={task.estimatedTime}></Timer>
        )}

        {task.estimatedTime === undefined ? (
          !isTimerInputOpen ? (
            <Button
              Icon={BsFillClockFill}
              className={`group-focus-within:outline-primary-800 group-focus-within:text-primary-800 ml-auto`}
              onClick={toggleTimerInput}
            >
              Add a Timer
            </Button>
          ) : (
            <Button
              className={`group-focus-within:outline-primary-800 group-focus-within:text-primary-700`}
              onClick={() => {
                if (inputRef.current) {
                  const timerInSeconds = HHMMSSToSeconds(inputRef.current.value)

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
          )
        ) : (
          <></>
        )}
      </div>

      <p className={`absolute bottom-1.5 text-sm`}>{timerError}</p>
    </div>
  )
}

export default memo(TaskCard)
