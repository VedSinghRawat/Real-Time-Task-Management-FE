import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Keys = {
  taskMap: Record<string, Task>
}

export type Actions = {
  addTask: (newTask: Omit<Task, 'id' | 'done' | 'active'>) => void
  updateTask: (id: Task['id'], updatePayload: Partial<Omit<Task, 'id' | 'done' | 'active'>>) => void
  removeTask: (id: Task['id']) => void
  increaseTimer: (id: Task['id'], by: number) => void
  decreaseTimer: (id: Task['id'], by: number) => void
  updateElapsed: (id: Task['id'], time: number) => void
  markDone: (id: Task['id']) => void
  unmarkDone: (id: Task['id']) => void
}

export type State = Keys & Actions

export const useTaskStore = create(
  persist(
    immer<State>((set) => ({
      taskMap: {},

      addTask: (newTask) =>
        set((state) => {
          console.log('hello world')
          const newId = uuid()
          state.taskMap[newId] = { ...newTask, id: newId, done: false, active: false }
        }),

      updateTask: (id, updatePayload) => set((state) => (state.taskMap[id] = { ...state.taskMap[id], ...updatePayload })),

      removeTask: (id) => set((state) => delete state.taskMap[id]),

      increaseTimer: (id, by) => set((state) => state.taskMap[id].estimatedTime + by),

      decreaseTimer: (id, by) => set((state) => state.taskMap[id].estimatedTime - by),

      updateElapsed: (id, time) => set((state) => (state.taskMap[id].elapsedTime = time)),

      markDone: (id) => set((state) => (state.taskMap[id].done = true)),

      unmarkDone: (id) => set((state) => (state.taskMap[id].done = false)),
    })),
    { name: 'state-zustand' }
  )
)
