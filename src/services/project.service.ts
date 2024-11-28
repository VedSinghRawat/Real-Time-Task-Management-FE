import { Project } from '../entities/project.entity'
import { ProjectUser } from '../entities/projectUser.entity'
import { ProjectCreateDTO, ProjectUpdateDTO } from '../validators/project/projectCreate.validator'
import apiService from './api.service'

export default class ProjectService {
  static listMine = () => apiService.methods.GET<{ project: Project[]; projectUser: ProjectUser[] }>({ urlSuffix: '/projects/user' })

  static create = (data: ProjectCreateDTO, image?: File) =>
    apiService.methods.POST<{ project: Project; projectUser: ProjectUser }>({
      urlSuffix: '/projects',
      data: { ...data, image },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

  static update = (id: number, data: ProjectUpdateDTO, image?: File) =>
    apiService.methods.PATCH<{ project: Project; projectUser: ProjectUser }>({
      urlSuffix: `/projects/${id}`,
      data: { ...data, image },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

  static delete = async (id: number) => apiService.methods.DELETE<{ project: Project }>({ urlSuffix: `/projects/${id}` })
}
