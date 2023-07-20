import { enableMapSet } from 'immer'
import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Keys = {
  taskMap: { [id: string]: Task }
  todoOrder: Task['id'][]
  doingOrder: Task['id'][]
  doneOrder: Task['id'][]
}

export type Actions = {
  addTask: (newTask: Omit<Task, 'id' | 'done' | 'active'>) => void
  updateTask: (id: Task['id'], updatePayload: Partial<Omit<Task, 'id'>>) => void
  removeTask: (id: Task['id']) => void
  increaseTimer: (id: Task['id'], by: number) => void
  decreaseTimer: (id: Task['id'], by: number) => void
}

export type State = Keys & Actions

enableMapSet()

export const useTaskStore = create(
  persist(
    immer<State>((set) => ({
      taskMap: {},
      todoOrder: [],
      doingOrder: [],
      doneOrder: [],

      addTask: (newTask) =>
        set((state) => {
          const newId = uuid()

          state.taskMap[newId] = { ...newTask, id: newId, done: false, active: false }
          state.todoOrder.unshift(newId)
        }),

      updateTask: (id, updatePayload) =>
        set((state) => {
          let old = state.taskMap[id]

          if (old) {
            old = { ...old, ...updatePayload }
          }
        }),

      removeTask: (id) =>
        set((state) => {
          state.taskMap[id]
        }),

      increaseTimer: (id, by) =>
        set((state) => {
          const task = state.taskMap[id]

          if (task) task.estimatedTime += by
        }),

      decreaseTimer: (id, by) =>
        set((state) => {
          const task = state.taskMap[id]

          if (task) task.estimatedTime -= by
        }),

      moveTodo: () => {},
    })),
    { name: 'state-zustand' }
  )
)
