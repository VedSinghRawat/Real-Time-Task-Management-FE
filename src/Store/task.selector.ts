import { createSelector } from 'reselect'
import { State } from './task.store'

export const baseStateSelector = (state: State) => state

export const taskMapSelector = createSelector(baseStateSelector, (state) => state.taskMap)
export const taskListSelector = createSelector(baseStateSelector, (state) => Object.values(state.taskMap))

export const taskTypedListSelector = (type: TaskType) =>
  createSelector(taskListSelector, (taskList) => taskList.filter((task) => task.type === type).sort((a, b) => a.order - b.order))

export const taskSetTimerActions = createSelector(baseStateSelector, (state) => [state.increaseTimer, state.decreaseTimer] as const)

export const taskFormActions = createSelector(baseStateSelector, (state) => [state.addTask, state.updateTask] as const)

export const taskMoveItemSelector = createSelector(baseStateSelector, (state) => state.moveTodo)

export const taskUpdateAction = createSelector(baseStateSelector, (state) => state.updateTask)
