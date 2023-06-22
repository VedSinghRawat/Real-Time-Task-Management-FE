import { FC, HTMLAttributes, memo, useEffect, useState } from 'react'
import { secondsToHHMMSS } from '../../utils'
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from 'react-icons/io'

interface TimerProps extends HTMLAttributes<HTMLSpanElement> {
  timeInSeconds: number
  active: boolean
  increaseTimer: () => void
  decreaseTimer: () => void
}

const Timer: FC<TimerProps> = ({ timeInSeconds, active, className = '', decreaseTimer, increaseTimer, ...rest }) => {
  const [currTime, setCurrTime] = useState(timeInSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      active &&
        setCurrTime((curr) => {
          return curr === 0 ? curr : curr - 1
        })
    }, 1000)

    return () => clearInterval(interval)
  }, [active])

  useEffect(() => setCurrTime(timeInSeconds), [timeInSeconds])

  return (
    <div {...rest} className={`${className} flex items-center gap-x-2`}>
      <span className={`text-lg`}>{secondsToHHMMSS(currTime)}</span>

      <div className={`border border-tertiary-500 rounded-sm p-0.5`}>
        <IoMdArrowDropupCircle onClick={() => increaseTimer()} />
        <IoMdArrowDropdownCircle onClick={() => decreaseTimer()} />
      </div>
    </div>
  )
}

export default memo(Timer)
