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
  const { lists } = useTaskMultiList(tasks)

  return (
    <div className={`flex justify-between ${className}`}>
      <MultiDraggableListWithContext
        handleItemMove={() => {
          console.log('hello')
        }}
        lists={lists}
      >
        {(list) => {
          const List = listByType[list.id]
          return <List key={list.id} tasks={list.items} />
        }}
      </MultiDraggableListWithContext>
    </div>
  )
}

export default memo(TaskMultiList)
