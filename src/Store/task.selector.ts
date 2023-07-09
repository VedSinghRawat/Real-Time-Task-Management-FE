import { createSelector } from 'reselect'
import { State } from './task.store'

export const baseStateSelector = (state: State) => state

const taskListSelector = createSelector(baseStateSelector, (state) => Object.values(state.taskMap))

export const taskDoneListSelector = createSelector(taskListSelector, (allTasks) => allTasks.filter((task) => task.done))

export const taskTodoListSelector = createSelector(taskListSelector, (allTasks) => allTasks.filter((task) => !task.active))

export const taskDoingListSelector = createSelector(taskListSelector, (allTasks) => allTasks.filter((task) => task.active))

export const taskSetTimerSelector = createSelector(baseStateSelector, (state) => [state.increaseTimer, state.decreaseTimer] as const)

export const taskFormFunctionSelector = createSelector(baseStateSelector, (state) => [state.addTask, state.updateTask] as const)
