import { FC, memo } from 'react'
import { useTaskStore } from '../../../Store/task.store'
import { taskDoneListSelector } from '../../../Store/task.selector'
import TaskList from './TaskList'

interface TaskDoneListProps {
  className?: string
}

const TaskDoneList: FC<TaskDoneListProps> = ({ className }) => {
  const doneTasks = useTaskStore(taskDoneListSelector)

  return (
    <TaskList tasks={doneTasks} droppableId={'done'} className={className}>
      <TaskList.Heading>Done</TaskList.Heading>

      <TaskList.DragList></TaskList.DragList>
    </TaskList>
  )
}

export default memo(TaskDoneList)
