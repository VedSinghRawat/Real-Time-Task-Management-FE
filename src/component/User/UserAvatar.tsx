import { FC } from 'react'
import { User } from '../../entities'
import { cn } from '../../utils/tailwind'

interface UserAvatarProps {
  user?: User | null
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

// Simple placeholder avatar showing the first letter
const UserAvatar: FC<UserAvatarProps> = ({ user, size = 'md', className }) => {
  const firstLetter = user?.username?.[0]?.toUpperCase() || '?'

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  }

  return (
    <div
      className={cn(
        // Ensure circle, add border, center content
        'rounded-full flex items-center justify-center border-2 border-white dark:border-gray-500',
        // Background and text colors
        'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold select-none',
        sizeClasses[size],
        className
      )}
      title={user?.username || 'User'}
    >
      {/* Initials are centered by flex properties */}
      {firstLetter}
    </div>
  )
}

export default UserAvatar
