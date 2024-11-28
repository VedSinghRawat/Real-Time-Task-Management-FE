import { Project } from '../../entities/project.entity'
import { ProjectUser, Role } from '../../entities/projectUser.entity'
import ProjectService from '../../services/project.service'
import { ApiAction, actionCreatorGenerator, StateSlice } from '../store'

type Keys = {
  map: { [id: string]: Project }
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean

  editId?: number
}

type Actions = {
  listMine: ApiAction<typeof ProjectService.listMine>
  create: ApiAction<typeof ProjectService.create>
  update: ApiAction<typeof ProjectService.update>
  delete: ApiAction<typeof ProjectService.delete>

  setEditId: (id?: number) => void
}

export type ProjectSlice = Keys & Actions

export const createProjectSlice: StateSlice<ProjectSlice> = (set) => {
  const actionGenerator = actionCreatorGenerator('project', set)

  const setProjectUsers = (projectUser: ProjectUser[]) => {
    set((state) => {
      const roleByUserIdByProjectId: { [projId: string]: { [userId: string]: Role } } = state.projectUser.roleByUserIdByProjectId

      for (const pu of projectUser) {
        if (!roleByUserIdByProjectId[pu.projectId]) roleByUserIdByProjectId[pu.projectId] = {}

        roleByUserIdByProjectId[pu.projectId]![pu.userId] = pu.role
      }

      state.projectUser.roleByUserIdByProjectId = roleByUserIdByProjectId
    })
  }

  return {
    map: {},
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    editId: undefined,

    listMine: actionGenerator(ProjectService.listMine, { onSuccess: ({ projectUser }) => setProjectUsers(projectUser) }),
    create: actionGenerator(ProjectService.create, { loadingKey: 'creating', onSuccess: ({ projectUser }) => setProjectUsers([projectUser]) }),
    update: actionGenerator(ProjectService.update, { loadingKey: 'updating' }),
    delete: actionGenerator(ProjectService.delete, {
      loadingKey: 'deleting',
      onSuccess: ({ project }) =>
        set((state) => {
          delete state.project.map[project.id]
        }),
    }),

    setEditId: (id?: number) =>
      set((state) => {
        state.project.editId = id
      }),
  }
}
