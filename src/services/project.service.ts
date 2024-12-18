import { STORAGE_BUCKET } from '../constants'
import { Project } from '../entities/project.entity'
import { ProjectUser } from '../entities/projectUser.entity'
import { ProjectCreateDTO, ProjectUpdateDTO } from '../validators/project/projectCreate.validator'
import supabaseService from './supabase.service'

interface IProjectService {
  list: (userId: string) => Promise<{ project: Project[]; projectUser: ProjectUser[] }>
  create: (data: ProjectCreateDTO, userId: string, image?: File) => Promise<{ project: Project; projectUser: ProjectUser }>
  update: (id: number, data: ProjectUpdateDTO, image?: File) => Promise<{ project: Project }>
  delete: (id: number) => Promise<{ project: Project }>
}

class ProjectService implements IProjectService {
  private static instance: ProjectService

  static createInstance() {
    if (!ProjectService.instance) ProjectService.instance = new ProjectService()
    return ProjectService.instance
  }

  list = async (userId: string) => {
    const result = await supabaseService.from('project_users').select('*, projects (*)').eq('user_id', userId).throwOnError()
    const data = result.data!

    const project = data.map((r) => r.projects!).filter(Boolean)
    const projectUser = data.map(({ projects: _, ...rest }) => rest)
    return { project, projectUser }
  }

  create = async (payload: ProjectCreateDTO, userId: string, image?: File) => {
    const { data } = await supabaseService.from('projects').insert(payload).select('*').single().throwOnError()
    let newProject = data!

    try {
      if (image) {
        const res = await this.update(newProject.id, { title: undefined }, image)
        newProject = res.project
      }

      const { data: projectUser } = await supabaseService
        .from('project_users')
        .insert({
          project_id: newProject.id,
          user_id: userId,
          role: 'owner' as const,
        })
        .select('*')
        .single()
        .throwOnError()

      return { project: newProject, projectUser: projectUser! }
    } catch (error) {
      newProject.image && (await supabaseService.storage.from(STORAGE_BUCKET).remove([newProject.image]))
      await this.delete(newProject.id)

      throw error
    }
  }

  update = async (id: number, data: ProjectUpdateDTO, imageFile?: File) => {
    let image: string | undefined
    if (imageFile) {
      const filePath = `images/project/${id}`

      image = await supabaseService.upload(filePath, imageFile)
    }

    const { data: project } = await supabaseService
      .from('projects')
      .update({ ...data, image })
      .eq('id', id)
      .select('*')
      .single()
      .throwOnError()

    return { project: project! }
  }

  delete = async (id: number) => {
    await supabaseService.from('projects').delete().eq('id', id).throwOnError()
    const { data: project } = await supabaseService.from('projects').select('*').eq('id', id).single().throwOnError()

    return { project: project! }
  }
}

export default ProjectService.createInstance()
