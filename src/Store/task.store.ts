import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { taskTypedListSelector } from './task.selector'

export type Keys = {
  taskMap: { [id: string]: Task }
  taskToConfirmDoneIds: Task['id'][]
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
      taskMap: {
        asdf: { description: 'task', timeLeft: 1000, estimatedTime: 1000, id: 'asdf', order: 1, type: 'todo', overTime: 0, created_at: new Date() },
        avndk: {
          description: 'task 1',
          timeLeft: 10000,
          estimatedTime: 10000,
          id: 'avndk',
          order: 2,
          type: 'todo',
          overTime: 0,
          created_at: new Date(),
        },
        nkald: { description: 'task 2', timeLeft: 100, estimatedTime: 100, id: 'nkald', order: 3, type: 'todo', overTime: 0, created_at: new Date() },
        nliia: {
          description: 'task 3',
          timeLeft: 100000,
          estimatedTime: 100000,
          id: 'nliia',
          order: 4,
          type: 'todo',
          overTime: 0,
          created_at: new Date(),
        },
        aslkanln: {
          description: 'task 4',
          timeLeft: 10,
          estimatedTime: 10,
          id: 'aslkanln',
          order: 5,
          type: 'todo',
          overTime: 0,
          created_at: new Date(),
        },
      },

      taskToConfirmDoneIds: [],

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
            created_at: new Date(),
          }
        }),

      updateTask: (id, updatePayload) =>
        set((state) => {
          const old = state.taskMap[id]

          for (const key in updatePayload) {
            // @ts-ignore
            old[key] = updatePayload[key]
          }
        }),

      removeTask: (id) =>
        set((state) => {
          const taskToDelete = state.taskMap[id]

          const deletedFromList = taskTypedListSelector(taskToDelete.type)(state)

          deletedFromList.forEach((t) => {
            if (t.order > taskToDelete.order) t.order -= 1
          })

          delete state.taskMap[id]
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
          const { fromListType, task, toOrder, toListType } = data
          const stateTask = state.taskMap[task.id]

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
        }),

      removeTaskToConfimDone: (id) =>
        set((state) => {
          state.taskToConfirmDoneIds = state.taskToConfirmDoneIds.filter((tId) => tId !== id)
        }),

      addTaskToConfimDone: (id) =>
        set((state) => {
          state.taskToConfirmDoneIds.push(id)
        }),

      clearTaskToConfimDone: () =>
        set((state) => {
          state.taskToConfirmDoneIds = []
        }),
    })),
    { name: 'state-zustand' }
  )
)
