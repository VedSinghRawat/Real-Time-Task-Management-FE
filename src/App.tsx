import { FC } from 'react'
import MultiDraggableListWithContext from './Components/UI/Draggable/MultiList/MultiDraggableListWithContext'
import { taskTodoListSelector, taskDoingListSelector, taskDoneListSelector, taskMoveItemSelector } from './Store/task.selector'
import { useTaskStore } from './Store/task.store'
import TaskTodoList from './Components/Task/Lists/TaskTodoList'
import TaskDoingList from './Components/Task/Lists/TaskDoingList'
import TaskDoneList from './Components/Task/Lists/TaskDoneList'

const App: FC = () => {
  const todoTasks = useTaskStore(taskTodoListSelector)
  const doingTasks = useTaskStore(taskDoingListSelector)
  const doneTasks = useTaskStore(taskDoneListSelector)

  const handleItemMove = useTaskStore(taskMoveItemSelector)

  return (
    <div className={`bg-primary-600 h-full w-full p-20`}>
      <div className={`flex justify-between mx-auto gap-x-20 px-20 h-full`}>
        <MultiDraggableListWithContext
          handleItemMove={handleItemMove}
          lists={[{ id: 'todo', items: todoTasks } as const, { id: 'doing', items: doingTasks } as const, { id: 'done', items: doneTasks } as const]}
        >
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
    </div>
  )
}

export default App
