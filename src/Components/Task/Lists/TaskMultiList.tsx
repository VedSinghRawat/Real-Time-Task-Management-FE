import { FC, memo, useMemo } from 'react'
import MultiDraggableListWithContext from '../../UI/Draggable/MultiList/MultiDraggableListWithContext'
import TaskDoingList from './TaskDoingList'
import TaskDoneList from './TaskDoneList'
import TaskTodoList from './TaskTodoList'
import { taskTodoListSelector, taskDoingListSelector, taskDoneListSelector, taskMoveItemSelector } from '../../../Store/task.selector'
import { useTaskStore } from '../../../Store/task.store'

interface TaskMultiListProps {}

const TaskMultiList: FC<TaskMultiListProps> = ({}) => {
  const todoTasks = useTaskStore(taskTodoListSelector)
  const doingTasks = useTaskStore(taskDoingListSelector)
  const doneTasks = useTaskStore(taskDoneListSelector)

  const handleItemMove = useTaskStore(taskMoveItemSelector)

  const taskLists = useMemo(
    () => [{ id: 'todo', items: todoTasks } as const, { id: 'doing', items: doingTasks } as const, { id: 'done', items: doneTasks } as const],
    [todoTasks, doingTasks, doneTasks]
  )

  return (
    <div className={`flex justify-between mx-auto gap-x-20 px-20 max-h-[45rem]`}>
      <MultiDraggableListWithContext handleItemMove={handleItemMove} lists={taskLists}>
        {(list) =>
          list.id === 'todo' ? (
            <TaskTodoList className={`max-w-sm w-full`} key={list.id} />
          ) : list.id === 'doing' ? (
            <TaskDoingList className={`max-w-sm w-full`} key={list.id} />
          ) : (
            <TaskDoneList className={`max-w-sm w-full`} key={list.id} />
          )
        }
      </MultiDraggableListWithContext>
    </div>
  )
}

export default memo(TaskMultiList)
