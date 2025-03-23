import { Tables } from './database.types'

export type User = Tables<'users'>
export type Task = Tables<'tasks'>
export type TaskType = Task['type']
export type TaskUser = Tables<'task_users'>

export type ProjectUser = Tables<'project_users'>
export type Role = ProjectUser['role']

export type Project = Tables<'projects'>
