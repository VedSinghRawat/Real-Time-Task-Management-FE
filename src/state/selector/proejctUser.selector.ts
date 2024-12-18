import { createSelector } from 'reselect'
import { createSliceSelectors, projectUserSliceSelector } from '../selector'
import { ProjectUserSlice } from '../slices/projectUser.slice'

const projectUserStateInit: { [key in keyof ProjectUserSlice]: undefined } = {
  map: undefined,
  roleByUserIdByProjectId: undefined,
  loading: undefined,
}

export default class ProjectUserSelectors {
  static base = createSliceSelectors('projectUser', projectUserStateInit, projectUserSliceSelector)

  static getRole = createSelector(this.base.roleByUserIdByProjectId, (roleByUserIdByProjectId) => {
    return (projectId: number, userId: string) => roleByUserIdByProjectId[projectId]?.[userId]
  })
}
