import { FC, memo } from 'react'
import DraggableList from '../UI/Draggable/SingleList/DraggableList'
import TaskCard from './TaskCard'

interface DraggableTaskListProps {
  droppableId: string
  tasks: Task[]
}

const DraggableTaskList: FC<DraggableTaskListProps> = ({ tasks, droppableId }) => {
  return (
    <DraggableList droppableId={droppableId} items={tasks}>
      {(task) => {
        return <TaskCard task={task} active={false} />
      }}
    </DraggableList>
  )
}

export default memo(DraggableTaskList)
