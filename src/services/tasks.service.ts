import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import supabaseService from './supabase.service'
import { Task, TaskType, TaskUser } from '../entities'
import { TaskCreateDTO, TaskUpdateDTO } from '../validators/task.validator'

interface ITaskService {
  subscribe: (projectId: number, callback: (payload: RealtimePostgresChangesPayload<Task>) => void) => void
  create: (data: TaskCreateDTO, projectId: number, userId: string) => Promise<{ task: Task; taskUser: TaskUser }>
  update: (id: number, data: TaskUpdateDTO) => Promise<{ task: Task }>
  delete: (id: number) => Promise<{ task: Task }>
  listByProjectId: (projectId: number) => Promise<{ task: Task[] }>
  move: (taskId: number, toType: TaskType, newOrder: number) => Promise<{ task: Task[] }>
}

class TaskService implements ITaskService {
  private static instance: TaskService

  static createInstance() {
    if (!TaskService.instance) TaskService.instance = new TaskService()
    return TaskService.instance
  }

  subscribe = (projectId: number, callback: (payload: RealtimePostgresChangesPayload<Task>) => void) => {
    supabaseService
      .channel(`tasks-project-${projectId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: `project_id=eq.${projectId}` }, callback)
      .subscribe()
  }

  create = async (payload: TaskCreateDTO, projectId: number, userId: string) => {
    const { data } = await supabaseService
      .from('tasks')
      .insert({ ...payload, project_id: projectId })
      .select('*')
      .single()
      .throwOnError()

    const newTask = data!

    try {
      const { data: taskUser } = await supabaseService
        .from('task_users')
        .insert({
          task_id: newTask.id,
          user_id: userId,
        })
        .select('*')
        .single()
        .throwOnError()

      return { task: newTask, taskUser: taskUser! }
    } catch (error) {
      await this.delete(newTask.id)
      throw error
    }
  }

  update = async (id: number, data: TaskUpdateDTO) => {
    const { data: task } = await supabaseService.from('tasks').update(data).eq('id', id).select('*').single().throwOnError()

    return { task: task! }
  }

  delete = async (id: number) => {
    const { data: task } = await supabaseService.from('tasks').select('*').eq('id', id).single().throwOnError()
    await supabaseService.from('tasks').delete().eq('id', id).throwOnError()

    return { task: task! }
  }

  move = async (taskId: number, toType: TaskType, newPosition: number) => {
    const { data } = await supabaseService.from('tasks').select('*').eq('id', taskId).single().throwOnError()
    const { project_id, position: taskToUpdateCurrPos, type: fromType } = data!

    const { data: projectTasks } = await supabaseService.from('tasks').select('*').eq('project_id', project_id).throwOnError()
    const taskUpdates: Task[] = []

    const lowerBound = Math.min(newPosition, taskToUpdateCurrPos)
    const upperBound = Math.max(newPosition, taskToUpdateCurrPos)
    const move = newPosition > taskToUpdateCurrPos ? -1 : 1

    projectTasks!.forEach(({ position, type, id, ...rest }) => {
      if (id === taskId) return

      if (toType !== fromType) {
        const isFromMovingList = type === fromType
        const isPositionHigherCurr = position > taskToUpdateCurrPos
        const isToMovingList = type === toType
        const isPositionHigherThanNew = position >= newPosition

        const sign = isFromMovingList && isPositionHigherCurr ? -1 : isToMovingList && isPositionHigherThanNew ? 1 : undefined

        if (sign) {
          const move = sign * 1
          taskUpdates.push({ ...rest, type, id, position: position + move })
        }
        return
      }

      if (!(position <= upperBound && position >= lowerBound && type === toType)) return
      taskUpdates.push({ ...rest, type, id, position: position + move })
    })

    if (toType !== fromType) {
      taskUpdates.sort((a, b) => {
        if (a.type === fromType && b.type === fromType) {
          return a.position - b.position
        }
        if (a.type === toType && b.type === toType) {
          return b.position - a.position
        }
        if (a.type === fromType && b.type === toType) {
          return -1
        }
        if (a.type === toType && b.type === fromType) {
          return 1
        }
        return 0
      })
    } else {
      taskUpdates.sort((a, b) => (move === 1 ? b.position - a.position : a.position - b.position))
    }

    await supabaseService.from('tasks').update({ position: 0 }).eq('id', taskId).throwOnError()
    await supabaseService.from('tasks').upsert(taskUpdates).throwOnError()
    await supabaseService.from('tasks').update({ position: newPosition, type: toType }).eq('id', taskId).throwOnError()

    return { task: [...taskUpdates, { ...data!, position: newPosition, type: toType }] }
  }

  listByProjectId: (projectId: number) => Promise<{ task: Task[] }> = async (projectId) => {
    const { data: task } = await supabaseService.from('tasks').select('*').eq('project_id', projectId).throwOnError()

    return { task: task! }
  }
}

export default TaskService.createInstance()
