import { ProjectUser, Role } from '../../entities'
import { StateSlice } from '../store'

type Keys = {
  map: { [id: string]: ProjectUser }
  roleByUserIdByProjectId: { [projId: string]: { [userId: string]: Role } }
  loading: boolean
}

// type Actions = {}

export type ProjectUserSlice = Keys

export const createProjectUserSlice: StateSlice<ProjectUserSlice> = () => {
  return {
    map: {},
    roleByUserIdByProjectId: {},
    loading: false,
  }
}
