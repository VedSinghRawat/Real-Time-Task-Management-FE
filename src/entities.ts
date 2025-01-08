import { Database } from './database.types'

export type User = Database['public']['Tables']['users']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type TaskUser = Database['public']['Tables']['task_users']['Row']

export type ProjectUser = Database['public']['Tables']['project_users']['Row']
export type Role = ProjectUser['role']

export type Project = Database['public']['Tables']['projects']['Row']
