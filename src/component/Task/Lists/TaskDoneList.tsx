import { FC, memo } from 'react'
import TaskList from './TaskList'
import { Task } from '../../../entities'

interface TaskDoneListProps {
  className?: string
  tasks: Task[]
}

const TaskDoneList: FC<TaskDoneListProps> = ({ className, tasks }) => {
  return (
    <TaskList tasks={tasks} droppableId={'done'} className={className}>
      <TaskList.Heading>Done</TaskList.Heading>

      <TaskList.DragList></TaskList.DragList>
    </TaskList>
  )
}

export default memo(TaskDoneList)
