import { FC, memo } from 'react'
import TaskList from './TaskList'
import TaskSelectors from '../../../state/selector/task.selector'
import { useAppStore } from '../../../state/store'

interface TaskDoneListProps {
  className?: string
}

const TaskDoneList: FC<TaskDoneListProps> = ({ className }) => {
  const doneTasks = useAppStore(TaskSelectors.listByType('done'))

  return (
    <TaskList tasks={doneTasks} droppableId={'done'} className={className}>
      <TaskList.Heading>Done</TaskList.Heading>

      <TaskList.DragList></TaskList.DragList>
    </TaskList>
  )
}

export default memo(TaskDoneList)
