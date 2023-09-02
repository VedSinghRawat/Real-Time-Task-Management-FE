import { createSelector } from 'reselect'
import { State } from './task.store'
import { getHistoryParam } from '../utils'
import { isSameDay, isToday } from 'date-fns'

export const baseStateSelector = (state: State) => state

export const taskMapSelector = createSelector(baseStateSelector, (state) => state.taskMap)
export const taskListSelector = createSelector(baseStateSelector, (state) => Object.values(state.taskMap))

export const taskTodayListSelector = createSelector(taskListSelector, (list) =>
  list.filter((t) => isToday(typeof t.created_at === 'string' ? new Date(t.created_at) : t.created_at))
)

export const taskTypedListSelector = (type: TaskType) =>
  createSelector(taskTodayListSelector, (taskList) => taskList.filter((task) => task.type === type).sort((a, b) => a.order - b.order))

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

export const taskAddToConfirmDoneActionSelector = createSelector(baseStateSelector, (state) => state.addTaskToConfimDone)

export const taskRemoveToConfirmDoneActionSelector = createSelector(baseStateSelector, (state) => state.removeTaskToConfimDone)

export const taskToConfirmDoneIdsSelector = createSelector(baseStateSelector, (state) => state.taskToConfirmDoneIds)

export const taskToConfirmDoneListSelector = createSelector([taskToConfirmDoneIdsSelector, taskMapSelector], (ids, map) =>
  ids.map((id) => map[id]).filter((t) => !!t)
)

export const taskListParamFilteredListSelector = createSelector(taskListSelector, (list) => {
  const historyParam = getHistoryParam()
  const filterDate = new Date(historyParam)

  return list.filter((task) => isSameDay(typeof task.created_at === 'string' ? new Date(task.created_at) : task.created_at, filterDate))
})
