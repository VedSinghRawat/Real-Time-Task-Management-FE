import { FC, useState, useRef, useEffect } from 'react'
import { Project } from '../../../entities/project.entity'
import { Link } from 'react-router-dom'
import Button from '../../UI/Button'
import { cn } from '../../../utils/tailwind'
import { BsPencilSquare, BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { Menu } from '@headlessui/react'
import { MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import ProjectForm from '../../ProjectForm'
import { Store, useAppStore } from '../../../state/store'
import { useShallow } from 'zustand/shallow'
import { FaSpinner } from 'react-icons/fa'

interface ProjectCardProps {
  project: Project
  showActions?: boolean
}

const selectors = (state: Store) => ({
  editId: state.project.editId,
  setEditId: state.project.setEditId,
})

const ProjectCard: FC<ProjectCardProps> = ({ project, showActions }) => {
  const { editId, setEditId } = useAppStore(useShallow(selectors))

  const [isExpanded, setIsExpanded] = useState(project.description.length < 100)
  const [contentHeight, setContentHeight] = useState<number | undefined>()
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!(contentRef.current && contentRef.current.innerText.length > 100)) return

    const scrollHeight = contentRef.current.scrollHeight
    setContentHeight(isExpanded ? scrollHeight : scrollHeight * 0.3)
  }, [isExpanded])

  if (editId === project.id) return <ProjectForm onClose={() => setEditId(undefined)} edit project={project} />

  const defaultImage = `/assets/img/default-proj-backgorund-${(project.id % 6) + 1}.jpg`

  return (
    <div className="relative p-4 rounded-lg border shadow-md transition-shadow select-none sm:p-6 bg-primary-3 hover:bg-primary-4 hover:shadow-lg text-secondary-11 border-secondary-7 hover:border-secondary-8 hover:text-secondary-12">
      <img
        src={project.image ? `${import.meta.env.VITE_S3_BASE_URL}/${project.image}` : defaultImage}
        alt="project_image"
        className="object-cover mb-3 rounded-lg aspect-video"
        onError={(e) => (e.currentTarget.src = defaultImage)}
      />

      <h3 className="mb-2 text-base font-semibold sm:text-lg lg:text-xl">{project.title}</h3>

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
            className="mt-1 text-xs font-semibold text-blue-700 underline transition-all duration-300 sm:text-sm hover:text-blue-900 underline-offset-2 hover:decoration-blue-900 lg:text-base"
          >
            <span className={`inline-block transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>↓</span>
            {isExpanded ? ' Show Less' : ' Show More'}
          </button>
        )}
      </div>

      <div className={cn(`flex justify-end items-center`, { 'justify-between': showActions })}>
        {showActions && <ActionMenu project={project} />}

        <Link to={`/project/${project.id}`}>
          <Button>View Project →</Button>
        </Link>
      </div>
    </div>
  )
}

const menuSelectors = (state: Store) => ({
  setEditId: state.project.setEditId,
  deleteAction: state.project.delete,
  deleting: state.project.deleting,
})

const ActionMenu = ({ project }: { project: Project }) => {
  const { setEditId, deleteAction, deleting } = useAppStore(useShallow(menuSelectors))

  return (
    <Menu>
      <MenuButton>
        <BsThreeDotsVertical className={`p-0.5 w-6 h-6 rounded-md cursor-pointer text-primary-3 bg-secondary-9 border-secondary-7 transition-all`} />
      </MenuButton>

      <MenuItems anchor="bottom start" className={`px-2 py-0.5 mt-1 backdrop-blur-md rounded-md bg-primary-3/30 w-32 border-secondary-7 border`}>
        <MenuItem
          as={'div'}
          className={({ focus }) =>
            cn(`text-secondary-11 px-2 py-1 rounded-md`, {
              'bg-secondary-9 text-primary-3': focus,
            })
          }
        >
          <button className="flex gap-2 justify-between items-center w-full" onClick={() => setEditId(project.id)}>
            Edit
            <BsPencilSquare />
          </button>
        </MenuItem>

        <MenuItem
          as={'button'}
          onClick={(e) => {
            e.preventDefault()
            void deleteAction(project.id)
          }}
          className={({ focus }) =>
            cn(`flex gap-2 justify-between items-center w-full text-red/70 px-2 py-1 rounded-md relative`, {
              'bg-red/90 text-secondary-12': focus || deleting,
              'justify-center': deleting,
            })
          }
        >
          {deleting ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              Delete
              <BsTrash />
            </>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

export default ProjectCard
