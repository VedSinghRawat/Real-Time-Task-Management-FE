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

  return (
    <div className={cn('flex flex-col space-y-3 p-4', className)}>
      {/* Map all users to list items */}
      {users.map((user) => {
        user.isOnline && console.log(user)
        return (
          <div key={user.id} className="flex items-center space-x-3">
            <UserAvatar user={user} size="sm" />
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{user.username}</span>
              {user.isOnline && <div className="w-2 h-2 bg-primary-11 rounded-full" title="Online"></div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProjectUserList
