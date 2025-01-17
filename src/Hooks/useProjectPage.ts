import { useShallow } from 'zustand/shallow'
import TaskSelectors from '../state/selector/task.selector'
import { Store, useAppStore } from '../state/store'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const selectors = (state: Store) => ({
  tasks: TaskSelectors.listByProjectId(state),
  list: TaskSelectors.base.listByProjectId(state),
})

const useProjectPage = () => {
  const { projectId } = useParams()
  const { tasks, list } = useAppStore(useShallow(selectors))

  useEffect(() => {
    projectId && void list(+projectId)
  }, [])

  return { tasks }
}

export default useProjectPage
