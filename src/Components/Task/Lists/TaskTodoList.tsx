import { FC, memo, useCallback, useState } from 'react'
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

  const toggleTaskForm = useCallback(() => setIsFormOpen((curr) => !curr), [setIsFormOpen])

  return (
    <TaskList tasks={todoTasks} droppableId={'todo'} className={className}>
      <div className={`flex ${isFormOpen ? 'flex-col gap-y-5' : ''}`}>
        <TaskList.Heading>Todo</TaskList.Heading>

        {isFormOpen ? (
          <TaskFormCard onClose={toggleTaskForm} className={`max-w-[14rem] mx-auto`} />
        ) : (
          <Button className={`w-fit px-3 text-lg py-1.5 ml-auto`} onClick={toggleTaskForm}>
            Add Todo
          </Button>
        )}
      </div>

      <TaskList.DragList />
    </TaskList>
  )
}

export default memo(TaskTodoList)
