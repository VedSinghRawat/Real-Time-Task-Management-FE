import { FC, HTMLAttributes, memo, useEffect, useState } from 'react'
import { secondsToHHMMSS } from '../../utils'
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from 'react-icons/io'

interface TimerProps extends HTMLAttributes<HTMLSpanElement> {
  timeInSeconds: number
  active?: boolean
  increaseTimer: () => void
  decreaseTimer: () => void
  onTimeChange?: (newTime: number) => void
}

const Timer: FC<TimerProps> = ({ timeInSeconds, onTimeChange, active = true, className = '', decreaseTimer, increaseTimer, ...rest }) => {
  const [currTime, setCurrTime] = useState(timeInSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      active &&
        setCurrTime((curr) => {
          const newTime = curr === 0 ? curr : curr - 1
          onTimeChange && onTimeChange(newTime)

          return newTime
        })
    }, 1000)

    return () => clearInterval(interval)
  }, [active])

  useEffect(() => setCurrTime(timeInSeconds), [timeInSeconds])

  return (
    <div {...rest} className={`${className} mt-3 flex items-center gap-x-2`}>
      <span className={`text-lg`}>{secondsToHHMMSS(currTime)}</span>

      <div className={`rounded-sm`}>
        <IoMdArrowDropupCircle className={`cursor-pointer`} onClick={() => increaseTimer()} />
        <IoMdArrowDropdownCircle className={`cursor-pointer`} onClick={() => decreaseTimer()} />
      </div>
    </div>
  )
}

export default memo(Timer)
