import { Project } from '../../entities/project.entity'
import ProjectService from '../../services/project.service'
import { ApiAction, actionCreatorGenerator, StateSlice } from '../store'

type Keys = {
  map: { [id: string]: Project }
  loading: boolean
}

type Actions = {
  listMine: ApiAction<typeof ProjectService.listMine>
}

export type ProjectSlice = Keys & Actions

export const createProjectSlice: StateSlice<ProjectSlice> = (set) => {
  const actionGenerator = actionCreatorGenerator('project', set)

  return {
    map: {},
    loading: false,

    listMine: actionGenerator(ProjectService.listMine, {
      onSuccess: ({ projectUsers }) => {
        set((state) => {})
      },
    }),
  }
}
