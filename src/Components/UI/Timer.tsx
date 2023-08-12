import { FC, HTMLAttributes, memo, useEffect, useState } from 'react'
import { secondsToHHMMSS } from '../../utils'

interface TimerProps extends HTMLAttributes<HTMLParagraphElement> {
  timeInSeconds: number
  active?: boolean
  dir?: 'inc' | 'dec'
  onTimeChange?: (newTime: number) => void
}

const Timer: FC<TimerProps> = ({ timeInSeconds, dir = 'dec', onTimeChange, active = true, ...rest }) => {
  const [currTime, setCurrTime] = useState(timeInSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      active &&
        setCurrTime((curr) => {
          const newTime = curr + (dir === 'dec' ? -1 : 1)

          setCurrTime(newTime)
          onTimeChange && onTimeChange(newTime)

          return newTime
        })
    }, 1000)

    return () => clearInterval(interval)
  }, [active, onTimeChange])

  return <p {...rest}>{secondsToHHMMSS(currTime)}</p>
}

export default memo(Timer)
