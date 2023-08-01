type TaskType = 'todo' | 'doing' | 'done'

interface Task {
  description: string
  estimatedTime: number
  timeLeft: number
  overTime: number
  id: string
  done: boolean
  type: TaskType
  order: number
}
