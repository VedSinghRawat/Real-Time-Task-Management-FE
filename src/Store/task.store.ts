import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Keys = {
  taskMap: Record<string, Task>
}

export type Actions = {
  addTask: (newTask: Omit<Task, 'id'>) => void
  removeTask: (id: Task['id']) => void
}

export type State = Keys & Actions

export const useStore = create(
  persist(
    immer<State>((set) => ({
      taskMap: {},

      addTask: (newTask) =>
        set((state) => {
          const newId = uuid()
          state.taskMap[newId] = { id: newId, ...newTask }
        }),

      removeTask: (id) => set((state) => delete state.taskMap[id]),
    })),
    { name: 'state-zustand' }
  )
)
