import { FC, memo, useCallback, useMemo } from 'react'
import MultiDraggableListWithContext from '../../UI/Draggable/MultiList/MultiDraggableListWithContext'
import TaskDoingList from './TaskDoingList'
import TaskDoneList from './TaskDoneList'
import TaskTodoList from './TaskTodoList'
import { taskAddToConfirmDoneActionSelector, taskMoveActionSelector, taskTypedListSelector } from '../../../Store/task.selector'
import { useTaskStore } from '../../../Store/task.store'
import { TaskType, Task } from '../../../Model/Task'

interface TaskMultiListProps {
  className?: string
}

const TaskMultiList: FC<TaskMultiListProps> = ({ className = '' }) => {
  const todoTasks = useTaskStore(taskTypedListSelector('todo'))
  const doingTasks = useTaskStore(taskTypedListSelector('doing'))
  const doneTasks = useTaskStore(taskTypedListSelector('done'))

  const taskAddtoToConfirmDone = useTaskStore(taskAddToConfirmDoneActionSelector)

  const taskMove = useTaskStore(taskMoveActionSelector)

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
            <TaskTodoList className={``} key={list.id} />
          ) : list.id === 'doing' ? (
            <TaskDoingList className={``} key={list.id} />
          ) : (
            <TaskDoneList className={``} key={list.id} />
          )
        }
      </MultiDraggableListWithContext>
    </div>
  )
}

export default memo(TaskMultiList)
