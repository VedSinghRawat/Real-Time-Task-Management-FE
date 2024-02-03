import { FC, memo } from 'react'
import TaskList from './TaskList'
import { taskTypedListSelector } from '../../../state/selector/task.selector'
import { useTaskStore } from '../../../state/store/task.store'

interface TaskDoneListProps {
  className?: string
}

const TaskDoneList: FC<TaskDoneListProps> = ({ className }) => {
  const doneTasks = useTaskStore(taskTypedListSelector('done'))

  return (
    <TaskList tasks={doneTasks} droppableId={'done'} className={className}>
      <TaskList.Heading>Done</TaskList.Heading>

      <TaskList.DragList></TaskList.DragList>
    </TaskList>
  )
}

export default memo(TaskDoneList)
