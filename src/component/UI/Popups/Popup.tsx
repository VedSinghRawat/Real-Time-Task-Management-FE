import { Transition, Dialog } from '@headlessui/react'
import { ButtonHTMLAttributes, FC, Fragment, memo, ReactNode, useCallback } from 'react'
import { ImCross } from 'react-icons/im'

export interface PopupProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
  onClose?: () => void
  className?: string
}

interface PopupCloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const PopupCloseButton: FC<PopupCloseButtonProps> = ({ className = '', ...rest }) => {
  return (
    <button {...rest} className={`rounded-full bg-tertiary-800 p-2 border-4 border-primary-700 text-primary-700 ${className}`}>
      <ImCross className={`h-2.5 w-2.5`} />
    </button>
  )
}

const Popup: FC<PopupProps> = ({ children, className = '', setIsOpen, isOpen, onClose }) => {
  const closePopup = useCallback(() => {
    onClose && onClose()
    setIsOpen(false)
  }, [setIsOpen, onClose])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closePopup}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-40 bg-black bg-opacity-70"></div>
        </Transition.Child>

        <Transition.Child
          className={`fixed sm:inset-[15%] inset-[5%] z-50 flex items-center justify-center`}
          as="div"
          enter="duration-300 transition-size"
          enterFrom="scale-150 opacity-0"
          enterTo={`scale-100 opacity-100`}
          leave="duration-300 transition-size"
          leaveFrom={`scale-100 opacity-100`}
          leaveTo="scale-150 opacity-0"
        >
          <div className={`relative max-w-full max-h-full flex my-auto scale `}>
            <Dialog.Panel
              className={`shadow-secondary-600 shadow-lg overflow-y-auto max-h-full mx-auto bg-secondary-600 border-4 shadow-popup border-primary-700 rounded-2xl p-6 sm:p-12 ${className} `}
            >
              {children}
            </Dialog.Panel>

            <PopupCloseButton onClick={closePopup} className={`absolute -top-3 -right-3`} />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default memo(Popup)
