import { FC, memo } from 'react'
import MultiDraggableListWithContext from '../../UI/Draggable/MultiList/MultiDraggableListWithContext'
import TaskDoingList from './TaskDoingList'
import TaskDoneList from './TaskDoneList'
import TaskTodoList from './TaskTodoList'
import { Task } from '../../../entities'
import useTaskMultiList from '../../../hooks/useTaskMultiList'

interface TaskMultiListProps {
  tasks: Task[]
  className?: string
}

const listByType = {
  todo: TaskTodoList,
  doing: TaskDoingList,
  done: TaskDoneList,
}

const TaskMultiList: FC<TaskMultiListProps> = ({ className = '', tasks }) => {
  const { lists, handleTaskMove } = useTaskMultiList(tasks)

  return (
    <div className={`flex justify-between items-start ${className}`}>
      <MultiDraggableListWithContext handleItemMove={handleTaskMove} lists={lists}>
        {(list) => {
          const List = listByType[list.id]
          return <List key={list.id} tasks={list.items} className="flex-1" />
        }}
      </MultiDraggableListWithContext>
    </div>
  )
}

export default memo(TaskMultiList)
