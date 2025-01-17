import { createSelector } from 'reselect'
import { createSliceSelectors, userSliceSelector } from '../selector'

export default class UserSelectors {
  static base = createSliceSelectors(
    'user',
    {
      map: undefined,
      meId: undefined,
      loading: undefined,
      fetchMe: undefined,
      login: undefined,
      signup: undefined,
    },
    userSliceSelector
  )

  static me = createSelector(this.base.map, this.base.meId, (map, meId) => (meId ? map[meId] : undefined))
}
