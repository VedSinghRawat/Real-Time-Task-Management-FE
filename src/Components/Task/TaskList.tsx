import { FC, memo } from 'react'
import DraggableList from '../UI/Draggable/SingleList/DraggableList'
import TaskCard from './TaskCard'

interface TaskListProps {
  droppableId: string
  tasks: Task[]
}

const TaskList: FC<TaskListProps> = ({ tasks, droppableId }) => {
  return (
    <DraggableList droppableId={droppableId} items={tasks}>
      {(task) => {
        return (
          <TaskCard
            task={task}
            active={false}
            decreaseTimer={() => {
              console.log('decrease')
            }}
            increaseTimer={() => {
              console.log('increase')
            }}
          />
        )
      }}
    </DraggableList>
  )
}

export default memo(TaskList)
