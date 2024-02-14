import { FC, memo, useState } from 'react'
import { FaHistory } from 'react-icons/fa'
import { MdToday } from 'react-icons/md'
import NavLink from './NavLink'
import DatePickerPopup from './Popups/DatePickerPopup'
import { useNavigate, useParams } from 'react-router-dom'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const { history } = useParams()
  const navigator = useNavigate()

  return (
    <>
      <header className={`max-w-[100vw] sticky top-0 inset-x-0 bg-primary-dark rounded-b-xl py-1.5`}>
        <ul className={`flex ${history ? 'justify-around' : 'justify-center'}`}>
          {history && (
            <li>
              <NavLink
                className={`px-6 min-w-[8rem] max-w-max mb-1.5`}
                onClick={() => {
                  navigator('/')
                }}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                Icon={MdToday}
              >
                Today
              </NavLink>
            </li>
          )}

          <li>
            {/*  eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <NavLink Icon={FaHistory} className={`px-6 min-w-[8rem] max-w-max`} onClick={() => setIsDatePickerOpen(true)}>
              History
            </NavLink>
          </li>
        </ul>
      </header>

      <DatePickerPopup
        onChange={(newDate) => {
          setIsDatePickerOpen(false)

          if (newDate) {
            navigator(`/${newDate.toUTCString()}`)
          }
        }}
        isOpen={isDatePickerOpen}
        setIsOpen={setIsDatePickerOpen}
      />
    </>
  )
}

export default memo(Header)
