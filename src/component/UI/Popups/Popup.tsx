import { Transition, Dialog, TransitionChild } from '@headlessui/react'
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
    <button {...rest} className={`p-2 rounded-full border-4 bg-secondary-2 border-primary-6 text-primary-6 ${className}`}>
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
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-40 bg-black bg-opacity-70"></div>
        </TransitionChild>

        <TransitionChild
          className={`fixed sm:inset-[15%] inset-[5%] z-50 flex items-center justify-center`}
          as="div"
          enter="duration-300 transition-size"
          enterFrom="scale-150 opacity-0"
          enterTo={`scale-100 opacity-100`}
          leave="duration-300 transition-size"
          leaveFrom={`scale-100 opacity-100`}
          leaveTo="scale-150 opacity-0"
        >
          <div className={`flex relative my-auto max-w-full max-h-full scale`}>
            <Dialog.Panel
              className={`overflow-y-auto p-6 mx-auto max-h-full rounded-2xl border-4 shadow-lg shadow-secondary-5 bg-secondary-5 shadow-popup border-primary-6 sm:p-12 ${className}`}
            >
              {children}
            </Dialog.Panel>

            <PopupCloseButton onClick={closePopup} className={`absolute -top-3 -right-3`} />
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  )
}

export default memo(Popup)
