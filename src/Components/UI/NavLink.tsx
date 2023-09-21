import { ButtonHTMLAttributes, FC, memo } from 'react'
import { IconType } from 'react-icons'

interface NavLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType
}

const NavLink: FC<NavLinkProps> = ({ className = '', Icon, children, ...rest }) => {
  return (
    <button
      className={`bg-primary-700 text-tertiary-700 px-4 flex items-center rounded-lg py-1 justify-around border-2 border-tertiary-700 ${className}`}
      {...rest}
    >
      {children}
      {Icon && <Icon className="" />}
    </button>
  )
}

export default memo(NavLink)
