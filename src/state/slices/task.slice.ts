import { ApiAction, createActionGenerator, StateSlice } from '../store'
import { Task } from '../../entities'
import tasksService from '../../services/tasks.service'
import TaskSelectors from '../selector/task.selector'

export type Keys = {
  map: { [id: string]: Task }
  idsToConfirm: Task['id'][]
  loading: boolean
}

export type Actions = {
  create: ApiAction<typeof tasksService.create>
  update: ApiAction<typeof tasksService.update>
  delete: ApiAction<typeof tasksService.delete>
  subscribe: typeof tasksService.subscribe
  removeFromConfirm: (id: Task['id']) => void
  addToConfirm: (id: Task['id']) => void
  clearConfirm: () => void
}

export type TaskSlice = Keys & Actions

export const createTaskSlice: StateSlice<TaskSlice> = (set) => {
  const actionGenerator = createActionGenerator('task', set)

  return {
    map: {},
    idsToConfirm: [],
    loading: false,

    create: actionGenerator(tasksService.create, {
      onSuccess: ({ task }) => {
        set((state) => {
          const tasks = TaskSelectors.listByType('todo')(state)
          tasks.forEach((task) => (task.order += 1))
          state.task.map[task.id] = task
        })
      },
    }),

    update: actionGenerator(tasksService.update),

    delete: actionGenerator(tasksService.delete, {
      onSuccess: ({ task }) => {
        set((state) => {
          delete state.task.map[task.id]
        })
      },
    }),

    subscribe: (projectId) => {
      tasksService.subscribe(projectId, (change) => {
        set((state) => {
          const { eventType, new: newTask, old: oldTask } = change
          if (eventType === 'INSERT' || eventType === 'UPDATE') {
            state.task.map[newTask.id] = newTask
          } else if (eventType === 'DELETE' && oldTask.id) {
            delete state.task.map[oldTask.id]
          }
        })
      })
    },

    removeFromConfirm: (id) =>
      set((state) => {
        state.task.idsToConfirm = state.task.idsToConfirm.filter((tId) => tId !== id)
      }),

    addToConfirm: (id) =>
      set((state) => {
        state.task.idsToConfirm.push(id)
      }),

    clearConfirm: () =>
      set((state) => {
        state.task.idsToConfirm = []
      }),
  }
}
