import { createSelector } from 'reselect'
import { State } from './task.store'

export const baseStateSelector = (state: State) => state

export const taskMapSelector = createSelector(baseStateSelector, (state) => state.taskMap)

export const taskDoneIdsListSelector = createSelector(baseStateSelector, (state) => state.doneOrder)
export const taskTodoIdsListSelector = createSelector(baseStateSelector, (state) => state.todoOrder)
export const taskDoingIdsListSelector = createSelector(baseStateSelector, (state) => state.doingOrder)

export const taskDoneListSelector = createSelector([taskMapSelector, taskDoneIdsListSelector], (map, idList) => idList.map((id) => map[id]))
export const taskTodoListSelector = createSelector([taskMapSelector, taskTodoIdsListSelector], (map, idList) => idList.map((id) => map[id]))
export const taskDoingListSelector = createSelector([taskMapSelector, taskDoingIdsListSelector], (map, idList) => idList.map((id) => map[id]))

export const taskSetTimerSelector = createSelector(baseStateSelector, (state) => [state.increaseTimer, state.decreaseTimer] as const)

export const taskFormFunctionSelector = createSelector(baseStateSelector, (state) => [state.addTask, state.updateTask] as const)

export const taskMoveItemSelector = createSelector(baseStateSelector, (state) => state.moveTodo)
