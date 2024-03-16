import { get, del, set } from 'idb-keyval'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, devtools, persist, StateStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { UserSlice, createUserSlice } from './slices/user.slice'
import { TaskSlice, createTaskSlice } from './slices/task.slice'

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

type ExtraState = {
  hasHydrated: boolean
  setHasHydrated: (isHyd: boolean) => void
}

export type EntitySliceMap = {
  user: UserSlice
  task: TaskSlice
}

type Store = EntitySliceMap & ExtraState

export type StateSlice<T> = StateCreator<Store, [['zustand/immer', never]], [['zustand/devtools', never]], T>

export const useAppStore = create<Store>()(
  persist(
    immer(
      devtools((set, get, store) => ({
        user: createUserSlice(set, get, store),
        task: createTaskSlice(set, get, store),

        hasHydrated: false as boolean,
        setHasHydrated: (isHyd) => {
          set({ hasHydrated: isHyd })
        },
      }))
    ),
    {
      name: 'todo-state-zustand',
      onRehydrateStorage: () => (state) => {
        state && state.setHasHydrated(true)
      },
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
