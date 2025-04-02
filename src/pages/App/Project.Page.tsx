import { FC, memo, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TaskMultiList from '../../component/Task/Lists/TaskMultiList'
import useProjectPage from '../../hooks/useProjectPage'
import ProjectInfo from '../../component/Project/ProjectInfo'
import ProjectUserList from '../../component/Project/ProjectUserList'
import { cn } from '../../utils/tailwind'
import { isMobile } from 'react-device-detect'

// Placeholder for icons - consider using an icon library like react-icons
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = () => {
  const { tasks, users } = useProjectPage()
  const [isUserListOpen, setIsUserListOpen] = useState(false)

  const closePanel = () => setIsUserListOpen(false)
  const openPanel = () => setIsUserListOpen(true)

  return (
    <section className={`flex flex-col mt-4 w-full sm:items-center grow`}>
      {/* Floating Action Button (FAB) to open user list */}
      <button
        onClick={openPanel}
        className={cn(
          'fixed left-4 top-1/2 z-30 transform -translate-y-1/2', // Lower z-index slightly
          'p-3 text-white bg-blue-600 rounded-full shadow-lg transition duration-150 ease-in-out hover:bg-blue-700',
          { hidden: isUserListOpen } // Still hide when panel is conceptually open
        )}
        aria-label="Show project members"
      >
        <UsersIcon />
      </button>

      {/* Headless UI Dialog for Sliding Panel */}
      <Transition appear show={isUserListOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 text-primary-12" onClose={closePanel}>
          {/* Backdrop Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 dark:bg-black/50" aria-hidden="true" />
          </Transition.Child>

          {/* Sliding Panel Content */}
          <div className="flex fixed left-0 top-1/2 max-w-full -translate-y-1/2 h-fit">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-200"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className={cn(
                  // Copied styles from previous panel div, adjust as needed
                  'relative w-64 bg-black rounded-r-lg border-r shadow-xl border-y border-secondary-7 dark:bg-gray-900'
                )}
              >
                {/* Panel Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-gray-200">Project Members</Dialog.Title>
                  <button
                    onClick={closePanel}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close members panel"
                  >
                    <CloseIcon />
                  </button>
                </div>
                {/* User List Container */}
                <div className="overflow-y-auto max-h-[31.25rem]">
                  <ProjectUserList users={users} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Main Content Area */}
      <ProjectInfo tasks={tasks} />

      <TaskMultiList tasks={tasks} className={cn(`gap-x-8 px-8 py-8 w-full max-w-5xl md:gap-x-16 grow`, { 'overflow-x-auto': isMobile })} />
    </section>
  )
}

export default memo(ProjectPage)
