import { Project, ProjectUser, Role } from '../../entities'
import ProjectService from '../../services/project.service'
import { ApiAction, createActionGenerator, StateSlice } from '../store'

type Keys = {
  map: { [id: string]: Project }
  loading: boolean
  currentId?: number
}

type Actions = {
  list: ApiAction<typeof ProjectService.list>
  create: ApiAction<typeof ProjectService.create>
  update: ApiAction<typeof ProjectService.update>
  delete: ApiAction<typeof ProjectService.delete>

  setCurrentId: (id?: number) => void
}

export type ProjectSlice = Keys & Actions

export const createProjectSlice: StateSlice<ProjectSlice> = (set) => {
  const actionGenerator = createActionGenerator('project', set)

  const setProjectUsers = (projectUser: ProjectUser[]) => {
    set((state) => {
      const roleByUserIdByProjectId: { [projId: string]: { [userId: string]: Role } } = state.projectUser.roleByUserIdByProjectId

      for (const pu of projectUser) {
        if (!roleByUserIdByProjectId[pu.project_id]) roleByUserIdByProjectId[pu.project_id] = {}

        roleByUserIdByProjectId[pu.project_id]![pu.user_id] = pu.role
      }

      state.projectUser.roleByUserIdByProjectId = roleByUserIdByProjectId
    })
  }

  return {
    map: {},
    loading: false,
    currentId: undefined,

    list: actionGenerator(ProjectService.list, { onSuccess: ({ projectUser }) => setProjectUsers(projectUser) }),
    create: actionGenerator(ProjectService.create, { onSuccess: ({ projectUser }) => setProjectUsers([projectUser]) }),
    update: actionGenerator(ProjectService.update),
    delete: actionGenerator(ProjectService.delete, {
      onSuccess: ({ project }) =>
        set((state) => {
          delete state.project.map[project.id]
        }),
    }),

    setCurrentId: (id?: number) =>
      set((state) => {
        state.project.currentId = id
      }),
  }
}
