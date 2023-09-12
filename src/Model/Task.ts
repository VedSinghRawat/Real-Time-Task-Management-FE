export const TASK_TYPES = ['todo', 'doing', 'done'] as const

export type TaskType = (typeof TASK_TYPES)[number]

export interface Task {
  description: string
  estimatedTime: number
  timeLeft: number
  overTime: number
  id: string
  type: TaskType
  order: number
  created_at: Date
}
