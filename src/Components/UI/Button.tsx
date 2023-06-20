import { FC, HTMLAttributes, memo } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  Icon?: IconType
  iconClasses?: string
}

const Button: FC<ButtonProps> = ({ className = '', iconClasses = '', Icon, children, ...rest }) => {
  return (
    <button
      className={`font-medium text-secondary-300 outline outline-[3px] outline-secondary-300 bg-tertiary-700 py-0.5 px-2.5 rounded flex items-center gap-x-3 ${className}`}
      {...rest}
    >
      {children} {Icon && <Icon className={`${iconClasses}`} />}
    </button>
  )
}

export default memo(Button)
