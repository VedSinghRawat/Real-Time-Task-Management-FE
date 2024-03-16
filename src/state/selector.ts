import { createSelector } from 'reselect'
import { EntitySliceMap } from './store'

const rootStateSelector = (state: EntitySliceMap) => state

export const userSliceSelector = createSelector(rootStateSelector, (state) => state.user)

export const taskSliceSelector = createSelector(rootStateSelector, (state) => state.task)

export function createSliceSelectors<
  E extends EntitySliceMap,
  EN extends keyof EntitySliceMap,
  ES extends E[EN],
  SK extends Exclude<keyof ES, symbol>,
>(_entityName: EN, initState: ES, baseSelector: (s: E) => ES) {
  const sliceKeys = Object.keys(initState) as SK[]

  return sliceKeys.reduce(
    (curr, k) => {
      curr[k] = createSelector(baseSelector, (s) => s[k])
      return curr
    },
    {} as { [key in SK]: (s: E) => ES[key] }
  )
}
