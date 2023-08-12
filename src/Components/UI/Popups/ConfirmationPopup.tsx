import { FC, ReactNode, memo } from 'react'
import Popup, { PopupProps } from './Popup'
import { AiFillWarning } from 'react-icons/ai'
import Button from '../Button'

interface ConfirmationPopupProps extends Omit<PopupProps, 'children'> {
  children: ReactNode
  buttonText: string
  onConfirm: () => void
}

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ onConfirm, children, setIsOpen, buttonText, className = '', ...rest }) => {
  return (
    <Popup {...rest} className={`${className} flex flex-col items-center text-center`} setIsOpen={setIsOpen}>
      <AiFillWarning className={`text-red-500 h-24 w-24`} />

      <p className={`text-lg text-white font-primary-semibold my-5`}>{children}</p>

      <Button
        onClick={() => {
          onConfirm()
          setIsOpen(false)
        }}
      >
        {buttonText}
      </Button>
    </Popup>
  )
}

export default memo(ConfirmationPopup)
