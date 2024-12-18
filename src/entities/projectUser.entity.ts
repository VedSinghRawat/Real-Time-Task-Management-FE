import { Database } from '../database.types'

export type ProjectUser = Database['public']['Tables']['project_users']['Row']
export type Role = ProjectUser['role']
