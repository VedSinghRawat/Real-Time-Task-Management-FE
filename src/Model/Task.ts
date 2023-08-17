type TaskType = 'todo' | 'doing' | 'done'

interface Task {
  description: string
  estimatedTime: number
  timeLeft: number
  overTime: number
  id: string
  type: TaskType
  order: number
  created_at: Date
}
