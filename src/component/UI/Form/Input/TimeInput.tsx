import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { InputProps, Input } from './Input'
import { TimeString } from '../../../../utils'

interface TimeInputProps extends InputProps {
  containerClasses?: string
  getValue?: (timeString: TimeString) => void
  className?: string
}

const TimeInput: FC<TimeInputProps> = ({ className = '', containerClasses = '', getValue, ...rest }) => {
  const hourInputRef = useRef<HTMLInputElement>(null)
  const minuteInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)

  const [hourValue, setHourValue] = useState('00')
  const [minuteValue, setMinuteValue] = useState('00')
  const [secondValue, setSecondValue] = useState('00')

  const inputVals = useMemo(() => [hourValue, minuteValue, secondValue] as const, [hourValue, minuteValue, secondValue])

  const inputsData = useMemo(() => {
    return [
      {
        ref: hourInputRef,
        label: 'h',
        setter: setHourValue,
        value: inputVals[0],
        max: 23,
        placeholder: '00',
      },
      {
        ref: minuteInputRef,
        label: 'm',
        setter: setMinuteValue,
        value: inputVals[1],
        max: 59,
        placeholder: '00',
      },
      {
        ref: secondInputRef,
        label: 's',
        setter: setSecondValue,
        value: inputVals[2],
        max: 59,
        placeholder: '00',
      },
    ]
  }, [className, inputVals])

  useEffect(() => {
    getValue && getValue(inputVals.join(':') as TimeString)
  }, [getValue, inputVals])

  return (
    <div className={`inline-flex gap-2 items-center ${containerClasses}`}>
      {inputsData.map(({ ref, value, label, setter, max, placeholder }, i) => {
        const nextRef = inputsData[i - 1]?.ref
        const nextSetter = inputsData[i - 1]?.setter

        console.log({ nextSetter, nextRef })

        return (
          <div className="flex relative items-center" key={label}>
            <Input
              value={value}
              onChange={(e) => {
                const value = e.currentTarget.value
                console.log({ nextSetter, nextRef })

                if (value === '') {
                  setter('')
                  return
                }

                // Only allow numbers
                if (!/^\d*$/.test(value)) return

                // Get numeric value for validation
                const numValue = parseInt(value, 10)

                // Check if value is within valid range
                if (isNaN(numValue)) return

                // Update the state
                if (numValue > max) {
                  const left = numValue - (max + 1)
                  setter(left.toString())
                  nextSetter && nextSetter('1')
                } else {
                  setter(value)
                }

                // Auto-focus next input if we've entered 2 digits
                if (value.length === 2 && nextRef?.current) {
                  nextRef.current.focus()
                  nextRef.current.select()
                }
              }}
              onFocus={(e) => e.target.select()}
              innerRef={ref}
              placeholder={placeholder}
              className={`rounded-md border border-secondary-7 focus:border-secondary-10`}
              maxLength={2}
              {...rest}
            />
            <span className="ml-1 text-secondary-11">{label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default memo(TimeInput)
