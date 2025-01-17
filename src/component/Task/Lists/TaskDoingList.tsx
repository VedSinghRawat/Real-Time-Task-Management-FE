import { FC, memo } from 'react'
import TaskList from './TaskList'
import { Task } from '../../../entities'

interface TaskDoingListProps {
  className?: string
  tasks: Task[]
}

const TaskDoingList: FC<TaskDoingListProps> = ({ className, tasks }) => {
  return (
    <TaskList tasks={tasks} droppableId={'doing'} className={className}>
      <TaskList.Heading>Doing</TaskList.Heading>

      <TaskList.DragList></TaskList.DragList>
    </TaskList>
  )
}

export default memo(TaskDoingList)
