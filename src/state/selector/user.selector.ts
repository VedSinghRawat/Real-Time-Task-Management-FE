import { createSelector } from 'reselect'
import { createSliceSelectors, userSliceSelector } from '../selector'
import { UserSlice } from '../slices/user.slice'

const userStateInit: { [key in keyof UserSlice]: undefined } = {
  map: undefined,
  meId: undefined,
  loading: undefined,
  fetchMe: undefined,
  login: undefined,
  signup: undefined,
}

export default class UserSelectors {
  static base = createSliceSelectors('user', userStateInit, userSliceSelector)

  static me = createSelector(this.base.map, this.base.meId, (map, meId) => (meId ? map[meId] : undefined))
}
