import { ButtonHTMLAttributes, FC, memo } from 'react'
import { IconType } from 'react-icons'
import { FaSpinner } from 'react-icons/fa'
import { cn } from '../../utils/tailwind'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: IconType
  iconClasses?: string
  isLoading?: boolean
  variant?: 'transparent'
}

const Button: FC<ButtonProps> = ({ className = '', iconClasses = '', Icon, children, isLoading, variant, ...rest }) => {
  return (
    <button
      className={cn(
        'font-medium text-sm md:text-base text-primary-3 bg-secondary-9 border border-secondary-7 py-0.5 px-2.5 rounded flex items-center gap-x-3 relative',
        className,
        {
          'bg-opacity-30 backdrop-blur-sm text-secondary-11 bg-primary-5': variant === 'transparent',
        }
      )}
      {...rest}
    >
      <span className={cn({ 'opacity-0': isLoading })}>
        {children} {Icon && <Icon className={iconClasses} />}
      </span>

      {isLoading && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <FaSpinner className="animate-spin" />
        </span>
      )}
    </button>
  )
}

export default memo(Button)
