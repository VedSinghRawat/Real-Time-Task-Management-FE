import { createSelector } from 'reselect'
import { createSliceSelectors, userSliceSelector } from '../selector'
import { Store } from '../store'
import { User } from '../../entities'

export default class UserSelectors {
  static base = createSliceSelectors(
    'user',
    {
      map: undefined,
      idsByProjectIds: undefined,
      meId: undefined,
      loading: undefined,
      fetchMe: undefined,
      login: undefined,
      signup: undefined,
      listByProjectId: undefined,
    },
    userSliceSelector
  )

  static me = createSelector(this.base.map, this.base.meId, (map, meId) => (meId ? map[meId] : undefined))

  static listByProjectId = createSelector(
    [this.base.map, this.base.idsByProjectIds, (_state: Store, projectId: string) => projectId],
    (userMap, idsByProjectMap, projectId): User[] => {
      const userIds = idsByProjectMap[projectId] || []
      return userIds.map((id) => userMap[id]).filter((user): user is User => !!user)
    }
  )
}
