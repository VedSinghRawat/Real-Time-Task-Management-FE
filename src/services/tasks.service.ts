import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import supabaseService from './supabase.service'
import { Task, TaskUser } from '../entities'
import { TaskCreateDTO, TaskUpdateDTO } from '../validators/task.validator'

interface ITaskService {
  subscribe: (projectId: number, callback: (payload: RealtimePostgresChangesPayload<Task>) => void) => void
  create: (data: TaskCreateDTO, projectId: number, userId: string) => Promise<{ task: Task; taskUser: TaskUser }>
  update: (id: number, data: TaskUpdateDTO) => Promise<{ task: Task }>
  delete: (id: number) => Promise<{ task: Task }>
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
}

export default TaskService.createInstance()
