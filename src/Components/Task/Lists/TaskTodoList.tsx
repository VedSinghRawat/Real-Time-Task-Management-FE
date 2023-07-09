import { FC, memo, useState } from 'react'
import { useTaskStore } from '../../../Store/task.store'
import { taskTodoListSelector } from '../../../Store/task.selector'
import Button from '../../UI/Button'
import TaskList from './TaskList'
import TaskFormCard from '../TaskFormCard'

interface TaskTodoListProps {
  className?: string
}

const TaskTodoList: FC<TaskTodoListProps> = ({ className }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const todoTasks = useTaskStore(taskTodoListSelector)

  return (
    <TaskList tasks={todoTasks} droppableId={'todo'} className={className}>
      <TaskList.Heading>Todo</TaskList.Heading>

      <TaskList.DragList></TaskList.DragList>

      {isFormOpen ? <TaskFormCard /> : <Button onClick={() => setIsFormOpen(true)}>Add Todo</Button>}
    </TaskList>
  )
}

export default memo(TaskTodoList)
