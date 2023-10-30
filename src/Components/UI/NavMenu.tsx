import { Popover, Transition } from '@headlessui/react'
import { FC, Fragment, memo, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useNavigate } from 'react-router'
import DatePickerPopup from './Popups/DatePickerPopup'
import NavLink from './NavLink'
import { Link } from 'react-router-dom'

interface NavMenuProps {}

const NavMenu: FC<NavMenuProps> = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const navigator = useNavigate()

  return (
    <>
      <Popover className="relative">
        <Popover.Button>
          <GiHamburgerMenu className={`fixed top-3 left-3 h-8 w-8 z-10 text-secondary-400 border-primary-800 border p-0.5 rounded bg-tertiary-700`} />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="fixed z-10 px-2 py-1 rounded-lg top-[4.3rem] left-4 bg-secondary-600">
            <div className={`m-auto w-0 h-0 border-x-[0.8rem] border-x-transparent border-b-[1rem] absolute -top-4 border-secondary-600`}></div>

            <ul className="flex flex-col gap-1">
              <Link to={'/dashboard'}>
                <NavLink>Dashboard</NavLink>
              </Link>

              <Link to={'/'}>
                <NavLink className={`w-full`}>Today</NavLink>
              </Link>
              <NavLink onClick={() => setIsDatePickerOpen(true)}>History</NavLink>
            </ul>

            <img src="/solutions.jpg" alt="" />
          </Popover.Panel>
        </Transition>
      </Popover>

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

export default memo(NavMenu)
