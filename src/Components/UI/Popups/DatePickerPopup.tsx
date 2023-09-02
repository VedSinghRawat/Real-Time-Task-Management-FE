import { FC, memo, useEffect, useState } from 'react'
import Popup, { PopupProps } from './Popup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getHistoryParam } from '../../../utils'

interface DatePickerPopupProps extends Omit<PopupProps, 'children'> {
  onChange: (date: Date | null, setters: ReturnType<typeof useState<Date>>) => void
}

const DatePickerPopup: FC<DatePickerPopupProps> = ({ onChange, className, ...rest }) => {
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    const historyParam = getHistoryParam()

    historyParam && setDate(new Date(historyParam))
  }, [])

  return (
    <Popup {...rest} className={`!p-0 ${className}`}>
      <div>
        <DatePicker selected={date} onChange={(newDate) => onChange(newDate, [date, setDate])} inline />
      </div>
    </Popup>
  )
}

export default memo(DatePickerPopup)
