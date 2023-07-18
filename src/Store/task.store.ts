import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Keys = {
  taskMap: Map<string, Task>
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

export const useTaskStore = create(
  persist(
    immer<State>((set) => ({
      taskMap: new Map(),
      todoOrder: [],
      doingOrder: [],
      doneOrder: [],

      addTask: (newTask) =>
        set((state) => {
          const newId = uuid()
          state.taskMap.set(newId, { ...newTask, id: newId, done: false, active: false })
          state.todoOrder.unshift(newId)
        }),

      updateTask: (id, updatePayload) =>
        set((state) => {
          const old = state.taskMap.get(id)

          if (old) {
            state.taskMap.set(id, { ...old, ...updatePayload })
          }
        }),

      removeTask: (id) =>
        set((state) => {
          state.taskMap.delete(id)
        }),

      increaseTimer: (id, by) =>
        set((state) => {
          if (state.taskMap.has(id)) {
            state.taskMap.get(id)!.estimatedTime += by
          }
        }),

      decreaseTimer: (id, by) =>
        set((state) => {
          if (state.taskMap.has(id)) {
            state.taskMap.get(id)!.estimatedTime -= by
          }
        }),

      moveTodo: () => {},
    })),
    { name: 'state-zustand' }
  )
)
