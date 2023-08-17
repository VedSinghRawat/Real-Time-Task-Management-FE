import { createSelector } from 'reselect'
import { State } from './task.store'
import { isToday } from 'date-fns'

export const baseStateSelector = (state: State) => state

export const taskMapSelector = createSelector(baseStateSelector, (state) => state.taskMap)
export const taskListSelector = createSelector(baseStateSelector, (state) =>
  Object.values(state.taskMap).filter((t) => (typeof t.created_at === 'string' ? isToday(new Date(t.created_at)) : isToday(t.created_at)))
)

export const taskTypedListSelector = (type: TaskType) =>
  createSelector(taskListSelector, (taskList) => taskList.filter((task) => task.type === type).sort((a, b) => a.order - b.order))

export const taskSetTimerActions = createSelector(
  baseStateSelector,
  (state) =>
    [(id: Task['id'], by: number) => state.changeTimer(id, by, 'inc'), (id: Task['id'], by: number) => state.changeTimer(id, by, 'dec')] as const
)

export const taskFormActions = createSelector(baseStateSelector, (state) => [state.addTask, state.updateTask] as const)

export const taskMoveItemSelector = createSelector(baseStateSelector, (state) => state.moveTodo)

export const taskUpdateAction = createSelector(baseStateSelector, (state) => state.updateTask)

export const taskRemoveAction = createSelector(baseStateSelector, (state) => state.removeTask)

export const taskTotalRemainingTime = createSelector(taskListSelector, (taskList) =>
  taskList.reduce((totalTime, task) => {
    if (task.type !== 'done') totalTime += task.timeLeft

    return totalTime
  }, 0)
)
