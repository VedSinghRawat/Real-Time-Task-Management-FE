import { FC, HTMLAttributes, memo, useEffect, useState } from 'react'
import { secondsToHHMMSS } from '../../utils'

interface TimerProps extends HTMLAttributes<HTMLSpanElement> {
  timeInSeconds: number
}

const Timer: FC<TimerProps> = ({ timeInSeconds, ...rest }) => {
  const [currTime, setCurrTime] = useState(timeInSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime((curr) => (curr < 0 ? 0 : curr - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <span {...rest}>{secondsToHHMMSS(currTime)}</span>
}

export default memo(Timer)
