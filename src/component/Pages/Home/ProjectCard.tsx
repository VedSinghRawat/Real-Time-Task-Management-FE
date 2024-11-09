import { FC, useState, useRef, useEffect } from 'react'
import { Project } from '../../../entities/project.entity'

interface ProjectCardProps {
  project: Project
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(project.description.length < 100)
  const contentRef = useRef<HTMLParagraphElement>(null)
  const [contentHeight, setContentHeight] = useState<number | undefined>()

  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.innerText.length < 100) return

      const scrollHeight = contentRef.current.scrollHeight
      setContentHeight(isExpanded ? scrollHeight : scrollHeight * 0.5)
    }
  }, [isExpanded])

  return (
    <div className="p-4 mb-4 rounded-lg shadow-md transition-shadow select-none sm:p-6 bg-primary-3 hover:bg-primary-4 hover:shadow-lg">
      <h3 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg lg:text-2xl">{project.title}</h3>

      <div className="relative mb-4">
        <p
          ref={contentRef}
          style={{ height: contentHeight ? `${contentHeight}px` : 'auto' }}
          className={`overflow-hidden text-xs text-gray-600 transition-all duration-300 ease-in-out sm:text-sm lg:text-base`}
        >
          {project.description || 'No description provided'}
        </p>

        {project.description && project.description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 text-xs font-semibold text-blue-700 underline transition-all duration-300 sm:text-sm hover:text-blue-900 underline-offset-2 hover:decoration-blue-900"
          >
            <span className={`inline-block transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>↓</span>
            {isExpanded ? ' Show Less' : ' Show More'}
          </button>
        )}
      </div>

      <div className="flex justify-end">
        <button className="text-xs font-medium text-blue-600 sm:text-sm lg:text-base hover:text-blue-800">View Project →</button>
      </div>
    </div>
  )
}

export default ProjectCard
