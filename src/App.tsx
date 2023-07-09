import { FC } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import TaskTodoList from './Components/Task/Lists/TaskTodoList'
import TaskDoingList from './Components/Task/Lists/TaskDoingList'
import TaskDoneList from './Components/Task/Lists/TaskDoneList'

const App: FC = () => {
  return (
    <div className={`bg-primary-600 h-full w-full p-20`}>
      <div className={`flex justify-between mx-auto gap-x-20 px-20 h-full`}>
        <DragDropContext onDragEnd={(res) => console.log(res)}>
          <TaskTodoList className={`w-full max-w-sm`} />

          <TaskDoingList className={`w-full max-w-sm`} />

          <TaskDoneList className={`w-full max-w-sm`} />
        </DragDropContext>
      </div>
    </div>
  )
}

export default App
