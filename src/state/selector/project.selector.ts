import { createSelector } from 'reselect'
import { createSliceSelectors, projectSliceSelector, SliceSelectorInitMap } from '../selector'
import { ProjectSlice } from '../slices/project.slice'

const projectStateInit: SliceSelectorInitMap<ProjectSlice> = {
  map: undefined,
  loading: undefined,
  list: undefined,
  create: undefined,
  delete: undefined,
  setEditId: undefined,
  update: undefined,
  editId: undefined,
}

export default class ProjectSelectors {
  static base = createSliceSelectors('project', projectStateInit, projectSliceSelector)

  static projects = createSelector(this.base.map, (map) => Object.values(map))
}
