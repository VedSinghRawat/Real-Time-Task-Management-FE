import { ApiAction, createActionGenerator, StateSlice } from '../store'
import { Task } from '../../entities'
import tasksService from '../../services/tasks.service'

export type Keys = {
  map: { [id: string]: Task }
  idsToConfirm: Task['id'][]
  taskIdsByProjectId: { [projectId: number]: Task['id'][] }
  loading: boolean
}

export type Actions = {
  create: ApiAction<typeof tasksService.create>
  update: ApiAction<typeof tasksService.update>
  delete: ApiAction<typeof tasksService.delete>
  subscribe: typeof tasksService.subscribe
  move: ApiAction<typeof tasksService.move>
  removeFromConfirm: (id: Task['id']) => void
  addToConfirm: (id: Task['id']) => void
  clearConfirm: () => void
  listByProjectId: ApiAction<typeof tasksService.listByProjectId>
}

export type TaskSlice = Keys & Actions

export const createTaskSlice: StateSlice<TaskSlice> = (set) => {
  const actionGenerator = createActionGenerator('task', set)
  const updateTaskIdsByProjectId = (data: { task: Task | Task[] }) => {
    const taskArray = Array.isArray(data.task) ? data.task : [data.task]

    taskArray.forEach((task) => {
      if (task.project_id !== null && task.type !== null) {
        const projectId = task.project_id

        set((state) => {
          if (!state.task.taskIdsByProjectId[projectId]) {
            state.task.taskIdsByProjectId[projectId] = []
          }

          if (!state.task.taskIdsByProjectId[projectId].includes(task.id)) {
            state.task.taskIdsByProjectId[projectId].push(task.id)
          }
        })
      }
    })
  }

  return {
    map: {},
    idsToConfirm: [],
    loading: false,
    taskIdsByProjectId: {},

    create: actionGenerator(tasksService.create),

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
            updateTaskIdsByProjectId({ task: newTask })
          } else if (eventType === 'DELETE' && oldTask.id) {
            delete state.task.map[oldTask.id]
          }
        })
      })
    },

    move: actionGenerator(tasksService.move, {
      beforeReq: (taskId, toType, newPosition) => {
        set((state) => {
          const task = state.task.map[taskId]
          if (!task) return

          const fromType = task.type
          const oldPosition = task.position

          // Optimistically update the moved task
          state.task.map[taskId] = { ...task, type: toType, position: newPosition }

          // Update positions of other tasks
          Object.values(state.task.map).forEach((t) => {
            if (t.id === taskId || t.project_id !== task.project_id) return

            let positionChange = 0
            if (toType !== fromType) {
              if (t.type === fromType && t.position > oldPosition) {
                positionChange = -1
              } else if (t.type === toType && t.position >= newPosition) {
                positionChange = 1
              }
            } else if (t.type === toType) {
              if (newPosition > oldPosition && t.position <= newPosition && t.position > oldPosition) {
                positionChange = -1
              } else if (newPosition < oldPosition && t.position >= newPosition && t.position < oldPosition) {
                positionChange = 1
              }
            }

            if (positionChange !== 0) {
              state.task.map[t.id] = { ...t, position: t.position + positionChange }
            }
          })
        })
      },
    }),

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

    listByProjectId: actionGenerator(tasksService.listByProjectId, { onSuccess: updateTaskIdsByProjectId }),
  }
}
