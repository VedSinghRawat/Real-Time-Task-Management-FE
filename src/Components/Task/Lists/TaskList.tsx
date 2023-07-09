import { FC, NamedExoticComponent, ReactNode, createContext, memo, useContext } from 'react'
import DraggableList from '../../UI/Draggable/SingleList/DraggableList'
import TaskCard from '../TaskCard'

interface TaskListProps {
  tasks: Task[]
  droppableId: string
  children: ReactNode
  className?: string
}

interface SubComps {
  Heading: FC<{ children: string }>
  DragList: FC
}

const TaskListContext = createContext<Omit<TaskListProps, 'className' | 'children'> | undefined>(undefined)

const Base = ({ className, children, ...rest }: TaskListProps) => {
  return (
    <TaskListContext.Provider value={rest}>
      <div className={`bg-primary-700 flex flex-col justify-between p-8 rounded-2xl ${className}`}>{children}</div>
    </TaskListContext.Provider>
  )
}

const MemoedBase = memo(Base) as unknown as NamedExoticComponent<TaskListProps> & SubComps

MemoedBase.Heading = ({ children }: { children: string }) => {
  return <h2 className={`text-secondary-600 text-4xl`}>{children}</h2>
}

MemoedBase.DragList = () => {
  const context = useContext(TaskListContext)

  return (
    <DraggableList droppableId={context!.droppableId} items={context!.tasks}>
      {(task) => <TaskCard task={task} />}
    </DraggableList>
  )
}

export default MemoedBase
