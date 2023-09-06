import { FC, memo, useState } from 'react'
import { FaHistory } from 'react-icons/fa'
import { MdToday } from 'react-icons/md'
import NavLink from './NavLink'
import DatePickerPopup from './Popups/DatePickerPopup'
import { getHistoryParam } from '../../utils'

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const historyParam = getHistoryParam()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  console.log({ historyParam })
  return (
    <>
      <header className={`max-w-[100vw] sticky inset-x-0 bg-primary-800 rounded-b-xl py-1.5`}>
        <ul className={`flex ${historyParam ? 'justify-around' : 'justify-center'}`}>
          {historyParam && (
            <li>
              <NavLink className={`px-6 min-w-[8rem] max-w-max mb-1.5`} Icon={MdToday}>
                Today
              </NavLink>
            </li>
          )}

          <li>
            <NavLink Icon={FaHistory} className={`px-6 min-w-[8rem] max-w-max`} onClick={() => setIsDatePickerOpen(true)}>
              History
            </NavLink>
          </li>
        </ul>
      </header>

      <DatePickerPopup
        onChange={(newDate, [_, setDate]) => {
          setIsDatePickerOpen(false)

          if (newDate) {
            window.location.replace(`${window.location.pathname}?h=${newDate.toISOString()}`)

            setDate(newDate)
          }
        }}
        isOpen={isDatePickerOpen}
        setIsOpen={setIsDatePickerOpen}
      />
    </>
  )
}

export default memo(Header)
