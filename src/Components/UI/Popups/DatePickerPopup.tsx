import { FC, memo } from 'react'
import Popup, { PopupProps } from './Popup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'react-router'
import { TODAY } from '../../../constants'

interface DatePickerPopupProps extends Omit<PopupProps, 'children'> {
  onChange: (date: Date) => void
}

const DatePickerPopup: FC<DatePickerPopupProps> = ({ onChange, className = '', ...rest }) => {
  const { history } = useParams()

  return (
    <Popup {...rest} className={`!p-0 ${className}`}>
      <div>
        <DatePicker
          maxDate={TODAY}
          selected={history ? new Date(history) : TODAY}
          onChange={(newDate) => {
            newDate && onChange(newDate)
          }}
          inline
        />
      </div>
    </Popup>
  )
}

export default memo(DatePickerPopup)
