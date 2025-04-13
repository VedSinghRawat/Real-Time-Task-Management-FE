import { FC } from 'react'
import { User } from '../../entities'
import UserAvatar from '../User/UserAvatar'
import { cn } from '../../utils/tailwind'

// Extend User type locally or define a new type
type UserWithOnlineStatus = User & { isOnline: boolean }

interface ProjectUserListProps {
  users: UserWithOnlineStatus[] // Use the extended type
  className?: string
}

const ProjectUserList: FC<ProjectUserListProps> = ({ users, className }) => {
  if (!users || users.length === 0) {
    return <p className={cn('text-gray-500 dark:text-gray-400 p-4', className)}>No members found.</p>
  }

  // Remove avatar stacking logic
  // const maxVisibleAvatars = 7
  // const visibleUsers = users.slice(0, maxVisibleAvatars)
  // const hiddenUserCount = users.length - maxVisibleAvatars

  return (
    // Use a vertical flex layout for the list
    <div className={cn('flex flex-col space-y-3 p-4', className)}>
      {/* Keep the title or remove if sidebar has its own title */}
      {/* <h3 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-300">Members</h3> */}

      {/* Map all users to list items */}
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-3">
          <UserAvatar user={user} size="sm" />
          <div className="flex items-center space-x-1.5">
            {' '}
            {/* Wrap username and dot */}
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{user.username}</span>
            {user.isOnline && <div className="w-2 h-2 bg-green-500 rounded-full" title="Online"></div>}
          </div>
          {/* Optional: Add role or other info here */}
        </div>
      ))}
    </div>
  )
}

export default ProjectUserList
