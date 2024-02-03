import { FC, memo } from 'react'
import TaskList from './TaskList'
import { taskTypedListSelector } from '../../../state/selector/task.selector'
import { useTaskStore } from '../../../state/store/task.store'

interface TaskDoingListProps {
  className?: string
}

const TaskDoingList: FC<TaskDoingListProps> = ({ className }) => {
  const doingTasks = useTaskStore(taskTypedListSelector('doing'))

  return (
    <TaskList tasks={doingTasks} droppableId={'doing'} className={className}>
      <TaskList.Heading>Doing</TaskList.Heading>

      <TaskList.DragList></TaskList.DragList>
    </TaskList>
  )
}

export default memo(TaskDoingList)
