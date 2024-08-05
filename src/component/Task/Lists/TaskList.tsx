import { FC, NamedExoticComponent, ReactNode, createContext, memo, useContext } from 'react'
import DraggableList from '../../UI/Draggable/SingleList/DraggableList'
import TaskCard from '../TaskCard'
import { Task } from '../../../model/Task'

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

const Base = ({ className = '', children, ...rest }: TaskListProps) => {
  return (
    <TaskListContext.Provider value={rest}>
      <div
        className={`bg-primary-normal flex flex-col justify-between p-3.5 sm:p-6 rounded-2xl gap-y-3.5 md:min-w-[16rem] min-w-[12.5rem] sm:gap-y-6 ${className}`}
      >
        {children}
      </div>
    </TaskListContext.Provider>
  )
}

const MemoedBase = memo(Base) as unknown as NamedExoticComponent<TaskListProps> & SubComps

MemoedBase.Heading = ({ children }: { children: string }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useContext(TaskListContext)

  return <h2 className={`text-secondary-normal text-2xl sm:text-4xl`}>{children}</h2>
}

MemoedBase.DragList = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(TaskListContext)

  return (
    <DraggableList
      className={`grow mx-auto w-full overflow-auto p-2.5 pt-3`}
      droppableId={context!.droppableId}
      items={context!.tasks}
      itemContianerClasses="mb-5"
    >
      {(task) => <TaskCard task={task} />}
    </DraggableList>
  )
}

export default MemoedBase
