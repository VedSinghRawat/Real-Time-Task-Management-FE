import { useShallow } from 'zustand/shallow'
import TaskSelectors from '../state/selector/task.selector'
import { Store, useAppStore } from '../state/store'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const selectors = (state: Store, projectId: number) => ({
  tasks: TaskSelectors.listByProjectId(state, projectId),
  list: TaskSelectors.base.listByProjectId(state),
})

const useProjectPage = () => {
  const { projectId } = useParams()
  const { tasks, list } = useAppStore(useShallow((state) => selectors(state, projectId ? +projectId : 0)))

  useEffect(() => {
    projectId && void list(+projectId)
  }, [list, projectId])

  return { tasks }
}

export default useProjectPage
