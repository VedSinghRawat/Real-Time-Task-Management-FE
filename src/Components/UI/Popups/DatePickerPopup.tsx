import { FC, memo } from 'react'
import Popup, { PopupProps } from './Popup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTaskStore } from '../../../Store/task.store'
import { taskFilterDateStateSelector } from '../../../Store/task.selector'

interface DatePickerPopupProps extends Omit<PopupProps, 'children'> {
  onChange: (date: Date, setters: (date: Date) => void) => void
}

const DatePickerPopup: FC<DatePickerPopupProps> = ({ onChange, className, ...rest }) => {
  const [date, setDate] = useTaskStore(taskFilterDateStateSelector)

  return (
    <Popup {...rest} className={`!p-0 ${className}`}>
      <div>
        <DatePicker maxDate={new Date()} selected={date} onChange={(newDate) => newDate && onChange(newDate, setDate)} inline />
      </div>
    </Popup>
  )
}

export default memo(DatePickerPopup)
