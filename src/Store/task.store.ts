import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { taskTypedListSelector } from './task.selector'
import { Task, TaskType } from '../Model/Task'
import { DUMMY_TASKS } from '../constants'
import { del, get, set } from 'idb-keyval'
import { TODAY } from '../constants'

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name)
  },
}

export type Keys = {
  taskMap: { [id: string]: Task }
  taskIdsToConfirmDone: Task['id'][]
}

export type Actions = {
  addTask: (newTask: Pick<Task, 'estimatedTime' | 'description'>) => void
  updateTask: (id: Task['id'], updatePayload: Partial<Omit<Task, 'id'>>) => void
  removeTask: (id: Task['id']) => void
  changeTimer: (id: Task['id'], by: number, type: 'inc' | 'dec') => void
  moveTodo: (data: { fromListType: TaskType; toOrder: number; toListType?: TaskType; task: Task }) => void
  removeTaskToConfimDone: (id: Task['id']) => void
  addTaskToConfimDone: (id: Task['id']) => void
  clearTaskToConfimDone: () => void
}

export type State = Keys & Actions

export const useTaskStore = create(
  persist(
    immer<State>((set) => ({
      taskMap: import.meta.env.DEV ? DUMMY_TASKS() : {},

      taskIdsToConfirmDone: [],

      isDonePopupOpen: false,

      addTask: (newTask) =>
        set((state) => {
          const newId = uuid()
          const todoTasks = taskTypedListSelector('todo')(state)

          todoTasks.forEach((task) => (task.order += 1))
          state.taskMap[newId] = {
            ...newTask,
            id: newId,
            type: 'todo',
            order: 1,
            overTime: 0,
            timeLeft: newTask.estimatedTime,
            created_at: TODAY,
          }
        }),

      updateTask: (id, updatePayload) =>
        set((state) => {
          const old = state.taskMap[id]

          for (const key in updatePayload) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            old[key] = updatePayload[key]
          }
        }),

      removeTask: (id) =>
        set((state) => {
          const taskToDelete = state.taskMap[id]

          if (taskToDelete) {
            const deletedFromList = taskTypedListSelector(taskToDelete.type)(state)

            deletedFromList.forEach((t) => {
              if (t.order > taskToDelete.order) t.order -= 1
            })

            delete state.taskMap[id]
          }
        }),

      changeTimer: (id, by, type) =>
        set((state) => {
          const task = state.taskMap[id]

          if (task) {
            task.estimatedTime += by * (type === 'dec' ? -1 : 1)
            task.timeLeft += by * (type === 'dec' ? -1 : 1)
          }
        }),

      moveTodo: (data) =>
        set((state) => {
          const stateTask = state.taskMap[data.task.id]

          if (stateTask) {
            const { fromListType, toOrder, toListType } = data

            const fromList = taskTypedListSelector(fromListType)(state)
            const toList = taskTypedListSelector(toListType || fromListType)(state)

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

      removeTaskToConfimDone: (id) =>
        set((state) => {
          state.taskIdsToConfirmDone = state.taskIdsToConfirmDone.filter((tId) => tId !== id)
        }),

      addTaskToConfimDone: (id) =>
        set((state) => {
          state.taskIdsToConfirmDone.push(id)
        }),

      clearTaskToConfimDone: () =>
        set((state) => {
          state.taskIdsToConfirmDone = []
        }),
    })),
    {
      name: 'todo-state-zustand',
      storage: createJSONStorage(() => storage, {
        reviver: (_key, value) => {
          // check if value is a Date ISO string
          if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
            return new Date(value)
          }
          return value
        },
      }),
    }
  )
)
