import { Transition, Dialog } from '@headlessui/react'
import { ButtonHTMLAttributes, FC, Fragment, memo, ReactNode, useCallback } from 'react'
import { ImCross } from 'react-icons/im'

export interface PopupProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
  className?: string
}

interface PopupCloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const PopupCloseButton: FC<PopupCloseButtonProps> = ({ className = '', ...rest }) => {
  return (
    <button {...rest} className={`rounded-full bg-primary-600 p-2 border-3 border-white text-white ${className}`}>
      <ImCross className={`h-2.5 w-2.5`} />
    </button>
  )
}

const Popup: FC<PopupProps> = ({ children, className = '', setIsOpen, isOpen }) => {
  const closePopup = useCallback(() => setIsOpen(false), [setIsOpen])

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
          className={`fixed inset-[15%] z-50 flex items-center justify-center`}
          as="div"
          enter="duration-700 transition-size"
          enterFrom="scale-400 opacity-0"
          enterTo={`scale-100 opacity-100`}
          leave="duration-700 transition-size"
          leaveFrom={`scale-100 opacity-100`}
          leaveTo="scale-400 opacity-0"
        >
          <div className={`relative max-w-full max-h-full flex my-auto`}>
            <Dialog.Panel
              className={`overflow-y-auto max-h-full mx-auto bg-primary-700 border-5 shadow-popup border-white rounded-2.5xl p-6 sm:p-12 ${className} `}
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
