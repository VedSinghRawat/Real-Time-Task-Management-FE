import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { taskTypedListSelector } from './task.selector'
import { subDays } from 'date-fns'
import { faker } from '@faker-js/faker'
import { generateToken, getRandomInt } from '../utils'
import { Task, TaskType } from '../Model/Task'

export type Keys = {
  taskMap: { [id: string]: Task }
  taskIdsToConfirmDone: Task['id'][]
  filterDate: Date | null
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
  setFilterDate: (date: Date) => void
}

export type State = Keys & Actions

export const useTaskStore = create(
  persist(
    immer<State>((set) => ({
      taskMap: Array.from({ length: 1000 }).reduce<Keys['taskMap']>((curr, _, i) => {
        if (i === 0) return curr

        const doneCount = getRandomInt(5, 8)
        const doingCount = getRandomInt(1, 3)
        const todoCount = getRandomInt(1, 2)

        Array.from({ length: todoCount }).forEach((_, j) => {
          const id = generateToken()
          const time = getRandomInt(30, 60 * 60 * 1)
          curr[id] = {
            id,
            created_at: subDays(new Date(), i),
            description: faker.lorem.lines(),
            estimatedTime: time,
            order: j + 1,
            overTime: 0,
            timeLeft: time,
            type: 'todo',
          }
        })

        Array.from({ length: doneCount + doingCount }).forEach((_, j) => {
          const id = generateToken()
          const time = getRandomInt(30, 60 * 60 * 1)
          const timeTaken = getRandomInt(time / 1.4, time * 1.1)

          let overTime = time - timeTaken
          const timeLeft = overTime > 0 ? 0 : overTime
          if (timeLeft !== 0) overTime = 0

          curr[id] = {
            id,
            created_at: subDays(new Date(), i),
            description: faker.lorem.lines(),
            estimatedTime: time,
            order: j + 1,
            overTime,
            timeLeft,
            type: j < doneCount ? 'done' : 'doing',
          }
        })

        return curr
      }, {}),

      taskIdsToConfirmDone: [],

      isDonePopupOpen: false,

      filterDate: null,

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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

      setFilterDate: (date) =>
        set((state) => {
          state.filterDate = date
        }),
    })),
    { name: 'state-zustand' }
  )
)
