import { createSelector } from 'reselect'
import { createSliceSelectors, projectSliceSelector } from '../selector'
import { ProjectSlice } from '../slices/project.slice'

const projectStateInit: { [key in keyof ProjectSlice]: undefined } = {
  map: undefined,
  loading: undefined,
  listMine: undefined,
}

export default class ProjectSelectors {
  static base = createSliceSelectors('project', projectStateInit, projectSliceSelector)

  static list = createSelector(this.base.map, (map) => Object.values(map))
}
