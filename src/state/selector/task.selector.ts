import { createSelector } from 'reselect'
import { createSliceSelectors, taskSliceSelector } from '../selector'

export default class TaskSelectors {
  public static base = createSliceSelectors(
    'task',
    {
      map: undefined,
      loading: undefined,
      idsToConfirm: undefined,
      addToConfirm: undefined,
      clearConfirm: undefined,
      delete: undefined,
      removeFromConfirm: undefined,
      update: undefined,
      create: undefined,
      subscribe: undefined,
      taskIdsByProjectId: undefined,
      move: undefined,
      listByProjectId: undefined,
    },
    taskSliceSelector
  )

  static listByProjectId = createSelector(this.base.map, this.base.taskIdsByProjectId, (map, taskIdsByProjectId) => {
    const projectId = window.location.pathname.split('/').pop()
    return projectId ? taskIdsByProjectId[+projectId]?.map((id) => map[id]!) || [] : []
  })

  static toConfirmList = createSelector([this.base.idsToConfirm, this.base.map], (ids, map) => ids.map((id) => map[id]!))
}
