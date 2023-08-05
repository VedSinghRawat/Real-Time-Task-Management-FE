import { FC, memo, useCallback, useState } from 'react'
import { useTaskStore } from '../../../Store/task.store'
import { taskTypedListSelector } from '../../../Store/task.selector'
import Button from '../../UI/Button'
import TaskList from './TaskList'
import TaskFormCard from '../TaskFormCard'
import { AiFillPlusCircle } from 'react-icons/ai'

interface TaskTodoListProps {
  className?: string
}

const TaskTodoList: FC<TaskTodoListProps> = ({ className }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const todoTasks = useTaskStore(taskTypedListSelector('todo'))
  const toggleTaskForm = useCallback(() => setIsFormOpen((curr) => !curr), [setIsFormOpen])

  return (
    <TaskList tasks={todoTasks} droppableId={'todo'} className={className}>
      <TaskList.Heading>Todo</TaskList.Heading>

      <TaskList.DragList />

      {isFormOpen ? (
        <TaskFormCard onClose={toggleTaskForm} className={`max-w-[14rem] mx-auto`} />
      ) : (
        <Button
          className={`w-full text-center px-3 text-sm sm:text-lg py-1.5 ml-auto justify-center`}
          Icon={AiFillPlusCircle}
          onClick={toggleTaskForm}
        >
          Add Todo
        </Button>
      )}
    </TaskList>
  )
}

export default memo(TaskTodoList)
