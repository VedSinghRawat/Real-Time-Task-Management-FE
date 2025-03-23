import { Popover, Transition } from '@headlessui/react'
import { FC, Fragment, memo, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useNavigate } from 'react-router'
import DatePickerPopup from './Popups/DatePickerPopup'
import NavLink from './NavLink'

interface NavMenuProps {}

const NavMenu: FC<NavMenuProps> = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const navigator = useNavigate()

  return (
    <>
      <Popover className="absolute md:text-xl">
        <Popover.Button>
          <GiHamburgerMenu
            className={`fixed top-3 left-3 md:top-6 md:left-6 h-8 w-8 md:h-11 md:w-11 z-10 text-secondary-10 border-secondary-3 border-2 p-0.5 rounded bg-secondary-5`}
          />
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
          <Popover.Panel className="fixed z-10 px-2 py-1 rounded-lg top-[4.3rem] md:top-[5.8rem] md:left-7 left-4 bg-primary-8">
            <div className={`m-auto w-0 h-0 border-x-[0.8rem] border-x-transparent border-b-[1rem] absolute -top-4 border-primary-6`}></div>

            <ul className="flex flex-col gap-1">
              <NavLink to={'/dashboard'}>Dashboard</NavLink>

              <NavLink to={'/'} className={`w-full`}>
                Today
              </NavLink>

              <button className="underline text-primary-11 " onClick={() => setIsDatePickerOpen(true)}>
                History
              </button>
            </ul>
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
