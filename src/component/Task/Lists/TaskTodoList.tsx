import { FC, memo } from 'react'
import TaskList from './TaskList'
import TaskFormCard from '../TaskFormCard'
import { Task } from '../../../entities'

interface TaskTodoListProps {
  className?: string
  tasks: Task[]
}

const TaskTodoList: FC<TaskTodoListProps> = ({ className, tasks }) => {
  return (
    <TaskList tasks={tasks} droppableId={'todo'} className={className}>
      <TaskList.Heading>Todo</TaskList.Heading>

      <TaskList.DragList />

      <TaskFormCard className={`mx-auto`} position={tasks.length + 1} />
    </TaskList>
  )
}

export default memo(TaskTodoList)
