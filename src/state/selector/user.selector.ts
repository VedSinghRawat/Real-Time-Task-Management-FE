import { createSelector } from 'reselect'
import { createSliceSelectors, userSliceSelector } from '../selector'
import { userStateInit } from '../slices/user.slice'

const base = createSliceSelectors('user', userStateInit, userSliceSelector)
const me = createSelector(base.map, base.meId, (map, meId) => (meId ? map[meId] : undefined))

export default { base, me }
