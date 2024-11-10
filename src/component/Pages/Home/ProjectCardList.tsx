import { FC } from 'react'
import { Project } from '../../../entities/project.entity'
import ProjectCard from './ProjectCard'

interface ProjectCardListProps {
  projects: Project[]
  emptyMessage?: string
}

const ProjectCardList: FC<ProjectCardListProps> = ({ projects, emptyMessage }) => {
  if (projects.length === 0) return <p className="mx-4 italic text-gray-500 md:mx-6 lg:mx-8">{emptyMessage || 'No projects available'}</p>

  return (
    <ul className="grid grid-cols-1 gap-2 p-0 mx-4 list-none md:gap-4 lg:gap-6 md:mx-6 lg:mx-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}

export default ProjectCardList
