import { useShallow } from 'zustand/shallow'
import TaskSelectors from '../state/selector/task.selector'
import UserSelectors from '../state/selector/user.selector'
import { Store, useAppStore } from '../state/store'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const selectors = (state: Store, projectId: string) => ({
  tasks: TaskSelectors.listByProjectId(state, +projectId),
  users: UserSelectors.listByProjectId(state, projectId),
  listTasks: TaskSelectors.base.listByProjectId(state),
  listUsersByProjectId: state.user.listByProjectId,
})

const useProjectPage = () => {
  const { projectId } = useParams()
  const projectIdStr = projectId || ''
  const projectIdNum = projectId ? +projectId : 0

  const { tasks, users, listTasks, listUsersByProjectId } = useAppStore(useShallow((state) => selectors(state, projectIdStr)))

  useEffect(() => {
    if (projectIdStr) {
      void listTasks(projectIdNum)
      void listUsersByProjectId(projectIdStr)
    }
  }, [listTasks, listUsersByProjectId, projectIdStr, projectIdNum])

  return { tasks, users }
}

export default useProjectPage
