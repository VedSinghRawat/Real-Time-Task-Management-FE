import { useShallow } from 'zustand/shallow'
import TaskSelectors from '../state/selector/task.selector'
import { Store, useAppStore } from '../state/store'
import { useParams } from 'react-router'
import { Task } from '../entities'

const selectors = (state: Store, projectId: number) => ({
  remainingTime: TaskSelectors.remainingTimeByProject(state, projectId),
})

const useProjectInfo = (tasks: Task[]) => {
  const { projectId } = useParams()
  const { remainingTime } = useAppStore(useShallow((state) => selectors(state, projectId ? +projectId : 0)))
  let done = 0
  tasks.forEach((task) => task.type === 'done' && done++)
  return { remainingTime, done }
}

export default useProjectInfo
