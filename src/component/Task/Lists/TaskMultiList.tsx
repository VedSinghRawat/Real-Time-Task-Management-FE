import { FC, memo, useCallback, useMemo } from 'react'
import MultiDraggableListWithContext from '../../UI/Draggable/MultiList/MultiDraggableListWithContext'
import TaskDoingList from './TaskDoingList'
import TaskDoneList from './TaskDoneList'
import TaskTodoList from './TaskTodoList'
import { TaskType, Task } from '../../../model/Task'
import TaskSelectors from '../../../state/selector/task.selector'
import { useAppStore } from '../../../state/store'

interface TaskMultiListProps {
  className?: string
}

const TaskMultiList: FC<TaskMultiListProps> = ({ className = '' }) => {
  const todoTasks = useAppStore(TaskSelectors.listByType('todo'))
  const doingTasks = useAppStore(TaskSelectors.listByType('doing'))
  const doneTasks = useAppStore(TaskSelectors.listByType('done'))

  const taskAddtoToConfirmDone = useAppStore(TaskSelectors.base.addToConfirm)

  const taskMove = useAppStore(TaskSelectors.base.move)

  const taskLists = useMemo(
    () => [{ id: 'todo', items: todoTasks } as const, { id: 'doing', items: doingTasks } as const, { id: 'done', items: doneTasks } as const],
    [todoTasks, doingTasks, doneTasks]
  )

  const handleTaskMove = useCallback(
    (data: { fromIndex: number; fromListId: TaskType; item: Task; toIndex: number; toListId?: TaskType }) => {
      if (data.toListId === 'done') {
        taskAddtoToConfirmDone(data.item.id)
      } else {
        taskMove({
          fromListType: data.fromListId,
          task: data.item,
          toOrder: data.toIndex + 1,
          toListType: data.toListId,
        })
      }
    },
    [taskAddtoToConfirmDone, taskMove]
  )

  return (
    <div className={`flex justify-between ${className}`}>
      <MultiDraggableListWithContext handleItemMove={handleTaskMove} lists={taskLists}>
        {(list) =>
          list.id === 'todo' ? (
            <TaskTodoList className={`flex-1`} key={list.id} />
          ) : list.id === 'doing' ? (
            <TaskDoingList className={`flex-1`} key={list.id} />
          ) : (
            <TaskDoneList className={`flex-1`} key={list.id} />
          )
        }
      </MultiDraggableListWithContext>
    </div>
  )
}

export default memo(TaskMultiList)
