import { FC, memo, useCallback, useState } from 'react'
import Button from '../../UI/Button'
import TaskList from './TaskList'
import TaskFormCard from '../TaskFormCard'
import { AiFillPlusCircle } from 'react-icons/ai'
import { Task } from '../../../entities'

interface TaskTodoListProps {
  className?: string
  tasks: Task[]
}

const TaskTodoList: FC<TaskTodoListProps> = ({ className, tasks }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const toggleTaskForm = useCallback(() => setIsFormOpen((curr) => !curr), [setIsFormOpen])

  return (
    <TaskList tasks={tasks} droppableId={'todo'} className={className}>
      <TaskList.Heading>Todo</TaskList.Heading>

      <TaskList.DragList />

      {isFormOpen ? (
        <TaskFormCard onClose={toggleTaskForm} className={`mx-auto`} />
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
