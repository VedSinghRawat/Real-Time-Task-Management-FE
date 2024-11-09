import { Project } from '../../entities/project.entity'
import { Role } from '../../entities/projectUser.entity'
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
      onSuccess: ({ projectUser }) => {
        console.log({ projectUser })
        set((state) => {
          const roleByUserIdByProjectId: { [projId: string]: { [userId: string]: Role } } = state.projectUser.roleByUserIdByProjectId

          for (const pu of projectUser) {
            if (!roleByUserIdByProjectId[pu.projectId]) roleByUserIdByProjectId[pu.projectId] = {}

            roleByUserIdByProjectId[pu.projectId]![pu.userId] = pu.role
          }

          state.projectUser.roleByUserIdByProjectId = roleByUserIdByProjectId
        })
      },
    }),
  }
}
