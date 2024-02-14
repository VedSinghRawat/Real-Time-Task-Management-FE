import { ButtonHTMLAttributes, FC, memo } from 'react'
import { IconType } from 'react-icons'

interface NavLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: IconType
}

const NavLink: FC<NavLinkProps> = ({ className = '', Icon, children, ...rest }) => {
  return (
    <button
      className={`bg-secondary-dark text-tertiary-light px-4 flex items-center rounded-lg py-1 justify-around border-2 border-secondary-medium ${className}`}
      {...rest}
    >
      {children}
      {Icon && <Icon className="" />}
    </button>
  )
}

export default memo(NavLink)
