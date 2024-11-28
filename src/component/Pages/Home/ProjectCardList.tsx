import { FC } from 'react'
import { Project } from '../../../entities/project.entity'
import ProjectCard from './ProjectCard'

interface ProjectCardListProps {
  projects: Project[]
  emptyMessage?: string
  showActions?: boolean
}

const ProjectCardList: FC<ProjectCardListProps> = ({ projects, emptyMessage, showActions }) => {
  if (projects.length === 0) return <p className="mx-4 italic text-gray-500 md:mx-6 lg:mx-8">{emptyMessage || 'No projects available'}</p>

  return (
    <ul className="grid grid-cols-1 gap-6 p-0 mx-4 list-none md:gap-8 lg:gap-12 md:mx-6 lg:mx-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} showActions={showActions} />
        </li>
      ))}
    </ul>
  )
}

export default ProjectCardList
