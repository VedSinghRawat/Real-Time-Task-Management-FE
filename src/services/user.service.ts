import { User } from '../entities'
import SupabaseService from './supabase.service'

interface IUserService {
  listByProjectId: (projectId: string) => Promise<{ user: User[] }>
}

class UserService implements IUserService {
  constructor(private supabase = SupabaseService) {}

  listByProjectId = async (projectId: string) => {
    const { data, error } = await this.supabase.from('project_users').select('users(*)').eq('project_id', projectId)

    if (error) {
      console.error('Error fetching users by project ID:', error)
      throw error
    }

    const users = data?.map((item) => item.users).filter((user): user is User => user !== null) || []

    return { user: users }
  }
}

export default new UserService()
