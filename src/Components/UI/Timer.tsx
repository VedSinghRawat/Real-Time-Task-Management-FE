import { Dispatch, FC, HTMLAttributes, SetStateAction, memo, useEffect, useState } from 'react'
import { secondsToHHMMSS } from '../../utils'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'

type TimerProps = HTMLAttributes<HTMLParagraphElement> & {
  timeInSeconds: number
  active?: boolean
  dir?: 'inc' | 'dec'

  onTimeChange?: (newTime: number) => void
} & (
    | { showControls?: false }
    | {
        showControls?: true
        onIncreaseControlClick: (internalSetter: Dispatch<SetStateAction<number>>) => void
        onDecreaseControlClick: (internalSetter: Dispatch<SetStateAction<number>>) => void
      }
  )

const Timer: FC<TimerProps> = ({ timeInSeconds, active, dir, onTimeChange, ...rest }) => {
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

  return (
    <div className={`flex items-center`}>
      <p {...rest}>{secondsToHHMMSS(currTime)}</p>

      {rest.showControls && (
        <div className={`flex flex-col ml-2 gap-y-1 `}>
          <button onClick={() => rest.onIncreaseControlClick(setCurrTime)}>
            <AiFillPlusCircle className={`bg-secondary-400 text-tertiary-300 rounded-full h-3.5 w-3.5 `} />
          </button>

          <button onClick={() => rest.onDecreaseControlClick(setCurrTime)}>
            <AiFillMinusCircle className={`bg-secondary-400 text-tertiary-300 rounded-full h-3.5 w-3.5`} />
          </button>
        </div>
      )}
    </div>
  )
}

export default memo(Timer)
