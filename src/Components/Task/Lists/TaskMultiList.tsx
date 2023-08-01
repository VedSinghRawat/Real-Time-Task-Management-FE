import { FC, memo, useCallback, useMemo } from 'react'
import MultiDraggableListWithContext from '../../UI/Draggable/MultiList/MultiDraggableListWithContext'
import TaskDoingList from './TaskDoingList'
import TaskDoneList from './TaskDoneList'
import TaskTodoList from './TaskTodoList'
import { taskMoveItemSelector, taskTypedListSelector } from '../../../Store/task.selector'
import { useTaskStore } from '../../../Store/task.store'

interface TaskMultiListProps {
  className?: string
}

const TaskMultiList: FC<TaskMultiListProps> = ({ className }) => {
  const todoTasks = useTaskStore(taskTypedListSelector('todo'))
  const doingTasks = useTaskStore(taskTypedListSelector('doing'))
  const doneTasks = useTaskStore(taskTypedListSelector('done'))

  const taskMove = useTaskStore(taskMoveItemSelector)

  const taskLists = useMemo(
    () => [{ id: 'todo', items: todoTasks } as const, { id: 'doing', items: doingTasks } as const, { id: 'done', items: doneTasks } as const],
    [todoTasks, doingTasks, doneTasks]
  )

  const handleTaskMove = useCallback(
    (data: { fromIndex: number; fromListId: TaskType; item: Task; toIndex: number; toListId?: TaskType }) =>
      taskMove({
        fromListType: data.fromListId,
        task: data.item,
        toOrder: data.toIndex + 1,
        toListType: data.toListId,
      }),
    [taskLists]
  )

  return (
    <div className={`flex justify-between ${className}`}>
      <MultiDraggableListWithContext handleItemMove={handleTaskMove} lists={taskLists}>
        {(list) =>
          list.id === 'todo' ? (
            <TaskTodoList className={`max-w-sm w-full min-w-[20rem]`} key={list.id} />
          ) : list.id === 'doing' ? (
            <TaskDoingList className={`max-w-sm w-full min-w-[20rem]`} key={list.id} />
          ) : (
            <TaskDoneList className={`max-w-sm w-full min-w-[20rem]`} key={list.id} />
          )
        }
      </MultiDraggableListWithContext>
    </div>
  )
}

export default memo(TaskMultiList)
