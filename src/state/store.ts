import { get, del, set } from 'idb-keyval'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, devtools, persist, StateStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { UserSlice, createUserSlice } from './slices/user.slice'
import { TaskSlice, createTaskSlice } from './slices/task.slice'
import { createProjectSlice, ProjectSlice } from './slices/project.slice'
import { createProjectUserSlice, ProjectUserSlice } from './slices/projectUser.slice'
import { KeysMatching } from '../utilType'
import { mergeDeepLeft } from 'ramda'

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
  pageLoading: boolean
}

export type EntitySliceMap = {
  user: UserSlice
  task: TaskSlice
  project: ProjectSlice
  projectUser: ProjectUserSlice
}

export type Store = EntitySliceMap & ExtraState

export type StateSlice<T> = StateCreator<Store, [['zustand/immer', never]], [['zustand/devtools', never]], T>

export const useAppStore = create<Store>()(
  persist(
    immer(
      devtools((set, get, store) => ({
        pageLoading: false,

        user: createUserSlice(set, get, store),
        task: createTaskSlice(set, get, store),
        project: createProjectSlice(set, get, store),
        projectUser: createProjectUserSlice(set, get, store),
      }))
    ),

    {
      name: 'todo-state-zustand',
      merge: (persistedState, currentState) => mergeDeepLeft(persistedState as Store, currentState),
      storage: createJSONStorage(() => storage, {
        reviver: (_key, value) => {
          // check if value is a Date ISO string
          if (!(typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value))) return value
          return new Date(value)
        },
      }),
    }
  )
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiAction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined>

export function createActionGenerator<KT extends keyof EntitySliceMap>(name: KT, set: Parameters<StateSlice<EntitySliceMap[KT]>>[0]) {
  return <P extends unknown[], T extends EntitySliceMap[typeof name]['map'][string], RT extends { [key in typeof name]: T } | { [key in KT]: T[] }>(
      api: (...args: P) => Promise<RT>,
      opts?: {
        beforeReq?: (...args: P) => void
        onSuccess?: (data: RT) => void
        onError?: (error: unknown) => void
        onFinal?: () => void
        loadingKey?: KeysMatching<EntitySliceMap[KT], boolean>
      }
    ) =>
    async (...args: P) => {
      const loadingKey = opts?.loadingKey || 'loading'

      set((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state[name][loadingKey] = true as any
      })

      let data: RT | undefined
      try {
        opts?.beforeReq?.(...args)

        data = await api(...args)

        set((state) => {
          const ent = data![name]
          if (Array.isArray(ent)) {
            for (const item of ent as T[]) {
              state[name].map[item.id] = item
            }
          } else {
            state[name].map[ent.id] = ent
          }
        })
        opts?.onSuccess?.(data)
      } catch (error) {
        console.error(error)
        opts?.onError?.(error)
      }

      set((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state[name][loadingKey] = false as any
      })

      opts?.onFinal?.()
      return data
    }
}
