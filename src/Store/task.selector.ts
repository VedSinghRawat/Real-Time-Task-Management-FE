import { createSelector } from 'reselect'
import { State } from './task.store'
import { isAfter, isSameDay, isToday, subDays } from 'date-fns'
import { TaskType, Task } from '../Model/Task'

export const baseStateSelector = (state: State) => state

export const taskMapSelector = createSelector(baseStateSelector, (state) => state.taskMap)
export const taskListSelector = createSelector(baseStateSelector, (state) => Object.values(state.taskMap))

export const taskTodayListSelector = createSelector(taskListSelector, (list) => list.filter((t) => isToday(t.created_at)))

export const taskTypedListSelector = (type: TaskType) =>
  createSelector(taskTodayListSelector, (taskList) => taskList.filter((task) => task.type === type).sort((a, b) => a.order - b.order))

export const taskSetTimerActions = createSelector(
  baseStateSelector,
  (state) =>
    [(id: Task['id'], by: number) => state.changeTimer(id, by, 'inc'), (id: Task['id'], by: number) => state.changeTimer(id, by, 'dec')] as const
)

export const taskFormActions = createSelector(baseStateSelector, (state) => [state.addTask, state.updateTask] as const)

export const taskAddActionSelector = createSelector(baseStateSelector, (state) => state.addTask)

export const taskMoveActionSelector = createSelector(baseStateSelector, (state) => state.moveTodo)

export const taskUpdateActionSelector = createSelector(baseStateSelector, (state) => state.updateTask)

export const taskRemoveActionSelector = createSelector(baseStateSelector, (state) => state.removeTask)

export const taskTotalRemainingTimeSelector = createSelector(taskTodayListSelector, (taskList) =>
  taskList.reduce((totalTime, task) => {
    if (task.type !== 'done') totalTime += task.timeLeft

    return totalTime
  }, 0)
)

export const taskAddToConfirmDoneActionSelector = createSelector(baseStateSelector, (state) => state.addTaskToConfimDone)

export const taskRemoveToConfirmDoneActionSelector = createSelector(baseStateSelector, (state) => state.removeTaskToConfimDone)

export const taskToConfirmDoneIdsSelector = createSelector(baseStateSelector, (state) => state.taskIdsToConfirmDone)

export const taskToConfirmDoneListSelector = createSelector(
  [taskToConfirmDoneIdsSelector, taskMapSelector],
  (ids, map) => ids.map((id) => map[id]).filter((t) => !!t) as Task[]
)

export const taskListDateFilteredSelector = (filterDate?: Date) =>
  createSelector(taskListSelector, (list) => (filterDate ? list.filter((task) => isSameDay(task.created_at, filterDate)) : []))

export const taskListLastWeekSelector = createSelector(taskListSelector, (list) => list.filter((t) => isAfter(t.created_at, subDays(new Date(), 8))))

export const taskYesterdayLeftoverListSelector = createSelector(taskListSelector, (list) =>
  list.filter((t) => t.type !== 'done' && isSameDay(t.created_at, subDays(new Date(), 1)))
)
