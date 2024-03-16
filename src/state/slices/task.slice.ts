import { v4 as uuid } from 'uuid'
import { Task, TaskType } from '../../model/Task'
import { TODAY } from '../../constants'
import { StateSlice } from '../store'
import TaskSelectors from '../selector/task.selector'

export type Keys = {
  map: { [id: string]: Task }
  idsToConfirm: Task['id'][]
}

export type Actions = {
  add: (newTask: Pick<Task, 'estimatedTime' | 'description'>) => void
  update: (id: Task['id'], updatePayload: Partial<Omit<Task, 'id'>>) => void
  delete: (id: Task['id']) => void
  changeTimer: (id: Task['id'], by: number, type: 'inc' | 'dec') => void
  move: (data: { fromListType: TaskType; toOrder: number; toListType?: TaskType; task: Task }) => void
  removeFromConfirm: (id: Task['id']) => void
  addToConfirm: (id: Task['id']) => void
  clearConfirm: () => void
}

export type TaskSlice = Keys & Actions

export const createTaskSlice: StateSlice<TaskSlice> = (set) => ({
  map: {},
  idsToConfirm: [],

  add: (newTask) =>
    set((state) => {
      const newId = uuid()
      const todoTasks = TaskSelectors.listByType('todo')(state)

      todoTasks.forEach((task) => (task.order += 1))
      state.task.map[newId] = {
        ...newTask,
        id: newId,
        type: 'todo',
        order: 1,
        overTime: 0,
        timeLeft: newTask.estimatedTime,
        created_at: TODAY,
      }
    }),

  update: (id, updatePayload) =>
    set((state) => {
      const old = state.task.map[id]

      for (const key in updatePayload) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        old[key] = updatePayload[key]
      }
    }),

  delete: (id) =>
    set((state) => {
      const taskToDelete = state.task.map[id]

      if (taskToDelete) {
        const deletedFromList = TaskSelectors.listByType(taskToDelete.type)(state)

        deletedFromList.forEach((t) => {
          if (t.order > taskToDelete.order) t.order -= 1
        })

        delete state.task.map[id]
      }
    }),

  changeTimer: (id, by, type) =>
    set((state) => {
      const task = state.task.map[id]

      if (task) {
        task.estimatedTime += by * (type === 'dec' ? -1 : 1)
        task.timeLeft += by * (type === 'dec' ? -1 : 1)
      }
    }),

  move: (data) =>
    set((state) => {
      const stateTask = state.task.map[data.task.id]

      if (stateTask) {
        const { fromListType, toOrder, toListType } = data

        const fromList = TaskSelectors.listByType(fromListType)(state)
        const toList = TaskSelectors.listByType(toListType || fromListType)(state)

        fromList.forEach((task) => {
          if (task.order > stateTask.order && task.id !== stateTask.id) task.order -= 1
        })

        toList.forEach((task) => {
          if (task.order >= toOrder && task.id !== stateTask.id) task.order += 1
        })

        stateTask.order = toOrder
        stateTask.type = toListType ? toListType : stateTask.type
      }
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
})
