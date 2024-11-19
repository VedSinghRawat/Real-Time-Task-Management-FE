import { Project } from '../entities/project.entity'
import { ProjectUser } from '../entities/projectUser.entity'
import { ProjectCreateDTO } from '../validators/project/projectCreate.validator'
import apiService from './api.service'

export default class ProjectService {
  static listMine = () => apiService.methods.GET<{ project: Project[]; projectUser: ProjectUser[] }>({ urlSuffix: '/projects/user' })

  static create = (data: ProjectCreateDTO, image?: File) => {
    return apiService.methods.POST<{ project: Project; projectUser: ProjectUser }>({
      urlSuffix: '/projects',
      data: { ...data, image },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
