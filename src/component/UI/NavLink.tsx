import { AnchorHTMLAttributes, FC, memo } from 'react'
import { Link } from 'react-router-dom'

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

const NavLink: FC<NavLinkProps> = ({ className = '', children, ...rest }) => {
  return (
    <Link className={`text-primary-11 ${className}`} {...rest}>
      {children}
    </Link>
  )
}

export default memo(NavLink)
