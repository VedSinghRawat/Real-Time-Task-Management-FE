import { FC, HTMLAttributes, memo, useEffect, useState } from 'react'
import { secondsToHHMMSS } from '../../utils'

interface TimerProps extends HTMLAttributes<HTMLParagraphElement> {
  timeInSeconds: number
  active?: boolean
  onTimeChange?: (newTime: number) => void
}

const Timer: FC<TimerProps> = ({ timeInSeconds, onTimeChange, active = true, ...rest }) => {
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

  return <p {...rest}>{secondsToHHMMSS(currTime)}</p>
}

export default memo(Timer)
