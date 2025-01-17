import { createSelector } from 'reselect'
import { createSliceSelectors, projectUserSliceSelector } from '../selector'

export default class ProjectUserSelectors {
  static base = createSliceSelectors(
    'projectUser',
    {
      map: undefined,
      roleByUserIdByProjectId: undefined,
      loading: undefined,
    },
    projectUserSliceSelector
  )

  static getRole = createSelector(this.base.roleByUserIdByProjectId, (roleByUserIdByProjectId) => {
    return (projectId: number, userId: string) => roleByUserIdByProjectId[projectId]?.[userId]
  })
}
