import { ButtonHTMLAttributes, FC, memo } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: IconType
  iconClasses?: string
}

const Button: FC<ButtonProps> = ({ className = '', iconClasses = '', Icon, children, ...rest }) => {
  return (
    <button
      className={`font-medium text-primary-3 bg-secondary-9 border border-secondary-7 py-0.5 px-2.5 rounded flex items-center gap-x-3 ${className}`}
      {...rest}
    >
      {children} {Icon && <Icon className={`${iconClasses}`} />}
    </button>
  )
}

export default memo(Button)
