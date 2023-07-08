import { createSelector } from 'reselect'
import { State } from './task.store'

export const baseStateSelector = (state: State) => state

export const taskSetTimerSelector = createSelector(baseStateSelector, (state) => [state.increaseTimer, state.decreaseTimer] as const)

export const taskFormFunctionSelector = createSelector(baseStateSelector, (state) => [state.addTask, state.updateTask] as const)
