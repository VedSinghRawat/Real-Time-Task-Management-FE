import { useCallback, useState } from 'react'
import TaskCard from './Components/Task/TaskCard'

function App() {
  const [task, setTask] = useState<Task>({ id: Math.trunc(Math.random() * 1000), description: '' })

  const updateTimer = useCallback(
    (newTime: number) => {
      setTask((currTask) => ({ ...currTask, estimatedTime: newTime }))
    },
    [task]
  )

  const increaseTimer = useCallback(() => {
    setTask((currTask) => ({ ...currTask, estimatedTime: (currTask.estimatedTime || 0) + 60 }))
  }, [task])

  const decreaseTimer = useCallback(() => {
    setTask((currTask) => ({ ...currTask, estimatedTime: Math.max((currTask.estimatedTime || 0) - 60, 0) }))
  }, [task])

  return (
    <div className={`bg-primary-700 h-full w-full p-10`}>
      <TaskCard active={false} task={task} setTaskTimer={updateTimer} increaseTimer={increaseTimer} decreaseTimer={decreaseTimer} />
    </div>
  )
}

export default App
