import { createSelector } from 'reselect'
import { createSliceSelectors, projectSliceSelector } from '../selector'

export default class ProjectSelectors {
  static base = createSliceSelectors(
    'project',
    {
      map: undefined,
      loading: undefined,
      list: undefined,
      create: undefined,
      delete: undefined,
      setEditId: undefined,
      update: undefined,
      editId: undefined,
    },
    projectSliceSelector
  )

  static projects = createSelector(this.base.map, (map) => Object.values(map))
}
