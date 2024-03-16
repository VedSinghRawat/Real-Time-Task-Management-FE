import { FC, memo } from 'react'
import TaskList from './TaskList'
import TaskSelectors from '../../../state/selector/task.selector'
import { useAppStore } from '../../../state/store'

interface TaskDoingListProps {
  className?: string
}

const TaskDoingList: FC<TaskDoingListProps> = ({ className }) => {
  const doingTasks = useAppStore(TaskSelectors.listByType('doing'))

  return (
    <TaskList tasks={doingTasks} droppableId={'doing'} className={className}>
      <TaskList.Heading>Doing</TaskList.Heading>

      <TaskList.DragList></TaskList.DragList>
    </TaskList>
  )
}

export default memo(TaskDoingList)
