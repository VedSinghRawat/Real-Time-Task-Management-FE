import { FC, memo, useCallback, useRef, useState } from 'react'
import TaskMultiList from '../Components/Task/Lists/TaskMultiList'
import Info from '../Components/UI/Info'
import TaskDonePopup from '../Components/UI/Popups/TaskDonePopup'
import { taskToConfirmDoneListSelector } from '../Store/task.selector'
import { useTaskStore } from '../Store/task.store'
import LeftoverTasksPopup from '../Components/UI/Popups/LeftoverTasksPopup'
import { useWindowSize } from '../Hooks/useWindowSize'

interface TodayProps {}

const Today: FC<TodayProps> = () => {
  const tasksToConfirm = useTaskStore(taskToConfirmDoneListSelector)

  const [showSroll, setShowScroll] = useState(false)

  const sectionElRef = useRef<HTMLElement>(null)

  const handleResize = useCallback((windowSize: { width: number; height: number }) => {
    if (sectionElRef.current) {
      if (sectionElRef.current.parentElement) {
        const elRight = sectionElRef.current.parentElement.getBoundingClientRect().right
        console.log(windowSize, elRight)
        setShowScroll(windowSize.width < elRight)
      }
    }
  }, [])

  useWindowSize(handleResize)

  return (
    <section
      className={`mt-4 flex flex-col ${showSroll ? 'h-[calc(100vh-7rem)] md:h-[calc(100vh-8.75rem)]' : 'h-[calc(100vh-8.25rem)]'}`}
      ref={sectionElRef}
    >
      <Info />

      <TaskMultiList className={`gap-x-8 px-8 md:gap-x-16 mx-auto mt-8 md:mt-16 grow`} />

      <LeftoverTasksPopup />

      {tasksToConfirm.map((task) => (
        <TaskDonePopup key={task.id} task={task} />
      ))}
    </section>
  )
}

export default memo(Today)
