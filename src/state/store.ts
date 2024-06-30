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
  pageLoading: boolean
  setHasHydrated: (isHyd: boolean) => void
}

export type EntitySliceMap = {
  user: UserSlice
  task: TaskSlice
}

export type Store = EntitySliceMap & ExtraState

export type StateSlice<T> = StateCreator<Store, [['zustand/immer', never]], [['zustand/devtools', never]], T>

export const useAppStore = create<Store>()(
  persist(
    immer(
      devtools((set, get, store) => ({
        hasHydrated: false,
        pageLoading: false,

        setHasHydrated: (isHyd) => {
          set({ hasHydrated: isHyd })
        },

        user: createUserSlice(set, get, store),
        task: createTaskSlice(set, get, store),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiAction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => Promise<void>
export function actionCreatorGenerator<KT extends keyof EntitySliceMap>(name: KT, set: Parameters<StateSlice<EntitySliceMap[KT]>>[0]) {
  return <P extends unknown[], T extends EntitySliceMap[KT]['map'][string], RT extends { [key in KT]: T } | { [key in KT]: T[] }>(
      api: (...args: P) => Promise<RT>,
      beforeReq?: () => void,
      afterRes?: (data: RT) => void,
      onError?: (error: unknown) => void
    ) =>
    async (...args: P) => {
      set((state) => {
        state[name].loading = true
      })

      try {
        beforeReq?.()

        const data = await api(...args)

        set((state) => {
          const ent = data[name]
          if (Array.isArray(ent)) {
            for (const item of ent as T[]) {
              state[name].map[item.id] = item
            }
          } else {
            state[name].map[ent.id] = ent
          }
        })

        afterRes?.(data)
      } catch (error) {
        console.error(error)
        onError?.(error)
      }

      set((state) => {
        state[name].loading = false
      })
    }
}
