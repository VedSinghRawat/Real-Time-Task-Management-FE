import { Project } from '../entities/project.entity'
import { ProjectUser } from '../entities/projectUser.entity'
import apiService from './api.service'

export default class ProjectService {
  static listMine = () => apiService.methods.GET<{ project: Project[]; projectUsers: ProjectUser[] }>({ urlSuffix: '/projects/user' })
}
