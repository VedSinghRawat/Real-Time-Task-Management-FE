import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { taskTypedListSelector } from './task.selector'

export type Keys = {
  taskMap: { [id: string]: Task }
}

export type Actions = {
  addTask: (newTask: Omit<Task, 'id' | 'done' | 'active' | 'timeLeft' | 'order' | 'overTime' | 'type'>) => void
  updateTask: (id: Task['id'], updatePayload: Partial<Omit<Task, 'id'>>) => void
  removeTask: (id: Task['id']) => void
  changeTimer: (id: Task['id'], by: number, type: 'inc' | 'dec') => void
  moveTodo: (data: { fromListType: TaskType; toOrder: number; toListType?: TaskType; task: Task }) => void
}

export type State = Keys & Actions

export const useTaskStore = create(
  persist(
    immer<State>((set) => ({
      taskMap: {
        asdf: { description: 'task', done: false, timeLeft: 1000, estimatedTime: 1000, id: 'asdf', order: 1, type: 'todo', overTime: 0 },
        avndk: { description: 'task 1', done: false, timeLeft: 10000, estimatedTime: 10000, id: 'avndk', order: 2, type: 'todo', overTime: 0 },
        nkald: { description: 'task 2', done: false, timeLeft: 100, estimatedTime: 100, id: 'nkald', order: 3, type: 'todo', overTime: 0 },
        nliia: { description: 'task 3', done: false, timeLeft: 100000, estimatedTime: 100000, id: 'nliia', order: 4, type: 'todo', overTime: 0 },
        aslkanln: { description: 'task 4', done: false, timeLeft: 10, estimatedTime: 10, id: 'aslkanln', order: 5, type: 'todo', overTime: 0 },
        kiwnd: { description: 'task 5', done: false, timeLeft: 1000000, estimatedTime: 1000000, id: 'kiwnd', order: 6, type: 'todo', overTime: 0 },
        ownfn: {
          description: 'task 6',
          done: false,
          timeLeft: 1000000000,
          estimatedTime: 1000000000,
          id: 'ownfn',
          order: 7,
          type: 'todo',
          overTime: 0,
        },
        oppomj: {
          description: 'task 7',
          done: false,
          timeLeft: 10000000,
          estimatedTime: 10000000,
          id: 'oppomj',
          order: 8,
          type: 'todo',
          overTime: 0,
        },
        ibbuuhj: {
          description: 'task 8',
          done: false,
          timeLeft: 100000000,
          estimatedTime: 100000000,
          id: 'ibbuuhj',
          order: 9,
          type: 'todo',
          overTime: 0,
        },
      },

      addTask: (newTask) =>
        set((state) => {
          const newId = uuid()
          const todoTasks = taskTypedListSelector('todo')(state)

          todoTasks.forEach((task) => (task.order += 1))
          state.taskMap[newId] = { ...newTask, id: newId, done: false, type: 'todo', order: 1, overTime: 0, timeLeft: newTask.estimatedTime }
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
    })),
    { name: 'state-zustand' }
  )
)
