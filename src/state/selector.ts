import { createSelector } from 'reselect'
import { EntitySliceMap, Store } from './store'

const rootStateSelector = (state: Store) => state

export const userSliceSelector = createSelector(rootStateSelector, (state) => state.user)

export const taskSliceSelector = createSelector(rootStateSelector, (state) => state.task)

export const loadingSelector = createSelector(rootStateSelector, (state) => state.pageLoading)

export const projectSliceSelector = createSelector(rootStateSelector, (state) => state.project)

export const projectUserSliceSelector = createSelector(rootStateSelector, (state) => state.projectUser)

export type SliceSelectorInitMap<T> = { [key in Exclude<keyof T, symbol>]: undefined }

export function createSliceSelectors<
  E extends EntitySliceMap,
  EN extends keyof EntitySliceMap,
  ES extends E[EN],
  K extends Exclude<keyof ES, symbol>,
  KM extends { [key in K]: undefined },
>(_entityName: EN, keyMap: KM, baseSelector: (s: E) => ES) {
  const keys = Object.keys(keyMap) as K[]

  const selectorMap = keys.reduce<{ [key in K]: (s: E) => ES[key] }>(
    (curr, k) => {
      curr[k] = createSelector(baseSelector, (s) => s[k])
      return curr
    },
    {} as { [key in K]: (s: E) => ES[key] }
  )

  return selectorMap
}
