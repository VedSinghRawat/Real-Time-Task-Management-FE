import { STORAGE_BUCKET } from '../constants'
import { Project, ProjectUser } from '../entities'
import { ProjectCreateDTO, ProjectUpdateDTO } from '../validators/project.validator'
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

  private static async updateProjectImg(project: Project) {
    project.image = project.image ? await supabaseService.getStorageFilePublicUrl(project.image) : null
    return project
  }

  list = async (userId: string) => {
    const result = await supabaseService.from('project_users').select('*, projects (*)').eq('user_id', userId).throwOnError()
    const data = result.data!

    const project = (
      await Promise.all(
        data.map(async (r) => {
          if (!r.projects) return
          return ProjectService.updateProjectImg(r.projects)
        })
      )
    ).filter(Boolean) as Project[]
    const projectUser = data.map(({ projects: _, ...rest }) => rest)
    return { project, projectUser }
  }

  create = async (payload: ProjectCreateDTO, userId: string, image?: File) => {
    const { data } = await supabaseService.from('projects').insert(payload).select('*').single().throwOnError()
    let newProject = data!

    try {
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

      if (image) {
        const res = await this.update(newProject.id, { title: undefined }, image)
        newProject = await ProjectService.updateProjectImg(res.project)
      }

      return { project: newProject, projectUser: projectUser! }
    } catch (error) {
      newProject.image && (await supabaseService.storage.from(STORAGE_BUCKET).remove([newProject.image]))
      await this.delete(newProject.id)

      throw error
    }
  }

  update = async (id: number, data: ProjectUpdateDTO, imageFile?: File | null) => {
    const { data: projectData } = await supabaseService.from('projects').select('*').eq('id', id).single().throwOnError()

    let image: string | null | undefined
    if (imageFile) {
      const filePath = `images/project/${id}` + imageFile.type.replace('image/', '.')

      image = await supabaseService.uploadFile(filePath, imageFile)
    } else if (imageFile === null && projectData?.image) {
      await supabaseService.deleteFile(projectData.image)
      image = null
    }

    const { data: project } = await supabaseService
      .from('projects')
      .update({ ...data, image })
      .eq('id', id)
      .select('*')
      .single()
      .throwOnError()

    return { project: await ProjectService.updateProjectImg(project!) }
  }

  delete = async (id: number) => {
    const { data: project } = await supabaseService.from('projects').select('*').eq('id', id).single().throwOnError()
    await supabaseService.from('projects').delete().eq('id', id).throwOnError()

    return { project: project! }
  }
}

export default ProjectService.createInstance()
