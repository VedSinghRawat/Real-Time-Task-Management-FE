import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import Input, { InputProps } from './Input'
import { TimeString } from '../../../../utils'

interface TimeInputProps extends InputProps {
  containerClasses?: string
  getValue?: (timeString: TimeString) => void
  className?: string
}

const TimeInput: FC<TimeInputProps> = ({ className, containerClasses, getValue, ...rest }) => {
  const hourInputRef = useRef<HTMLInputElement>(null)
  const minuteInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)

  const [hourValue, setHourValue] = useState('')
  const [minuteValue, setMinuteValue] = useState('')
  const [secondValue, setSecondValue] = useState('')

  const inputVals = [hourValue, minuteValue, secondValue]

  const inputsData = useMemo(() => {
    return [
      {
        ref: hourInputRef,
        label: 'h',
        className: `!rounded-l-md !rounded-none pr-4 w-12 ${className}`,
        setter: setHourValue,
        value: inputVals[0],
        disable: inputVals[1].length < 2,
      },
      {
        ref: minuteInputRef,
        label: 'm',
        className: `!rounded-none pr-5 w-11 ${className}`,
        setter: setMinuteValue,
        value: inputVals[1],
        disable: inputVals[2].length < 2,
      },
      {
        ref: secondInputRef,
        label: 's',
        className: `!rounded-r-md !rounded-none pr-3.5 w-9 ${className}`,
        setter: setSecondValue,
        value: inputVals[2],
        disable: false,
      },
    ]
  }, [className, hourInputRef, minuteInputRef, secondInputRef, setHourValue, setMinuteValue, setSecondValue, ...inputVals])

  useEffect(() => {
    getValue && getValue(inputVals.join(':') as TimeString)
  }, inputVals)

  return (
    <div className={`text-lg ${containerClasses}`}>
      {inputsData.map(({ ref, value, disable, label, className, setter }, i) => {
        return (
          <span className={`relative`} key={label}>
            <Input
              disabled={disable}
              placeholder="00"
              value={value}
              onChange={(e) => {
                const val = e.currentTarget.value

                if (val.length <= 2) !isNaN(+val) && setter(val)

                if (val.length >= 2) {
                  const nextInput = inputsData[i - 1]?.ref.current

                  if (nextInput) {
                    nextInput.disabled = false
                    nextInput.focus()
                  }
                }
              }}
              setRef={ref}
              className={`text-right !outline-none !border-0 ${className}`}
              {...rest}
            />

            <span className={`right-1 top-1/2 -translate-y-1/2 absolute text-opacity-70`}>{label}</span>
          </span>
        )
      })}
    </div>
  )
}

export default memo(TimeInput)