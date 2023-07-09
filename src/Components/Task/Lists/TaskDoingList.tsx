import { FC, memo } from 'react'
import { useTaskStore } from '../../../Store/task.store'
import { taskDoingListSelector } from '../../../Store/task.selector'
import TaskList from './TaskList'

interface TaskDoingListProps {
  className?: string
}

const TaskDoingList: FC<TaskDoingListProps> = ({ className }) => {
  const doingTasks = useTaskStore(taskDoingListSelector)

  return (
    <TaskList tasks={doingTasks} droppableId={'doing'} className={className}>
      <TaskList.Heading>Doing</TaskList.Heading>

      <TaskList.DragList></TaskList.DragList>
    </TaskList>
  )
}

export default memo(TaskDoingList)
