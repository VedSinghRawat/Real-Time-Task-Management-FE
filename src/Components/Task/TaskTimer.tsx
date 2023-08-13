import { FC, memo, useMemo } from 'react'
import Timer from '../UI/Timer'
import alert from '../../assets/audio/alert.wav'
import { taskSetTimerActions, taskUpdateAction } from '../../Store/task.selector'
import { useTaskStore } from '../../Store/task.store'

const alertAudio = new Audio(alert)

interface TaskTimerProps {
  task: Task
  isDonePopupOpen: boolean
  setIsDonePopupOpen: (arg: boolean) => void
}

const TaskTimer: FC<TaskTimerProps> = ({ task, isDonePopupOpen, setIsDonePopupOpen }) => {
  const taskUpdate = useTaskStore(taskUpdateAction)

  const [inc, dec] = useTaskStore(taskSetTimerActions)
  const [increaseTimeEstimate, decreaseTimeEstimate] = useMemo(() => [() => inc(task.id, 60), () => dec(task.id, 60)], [])

  return (
    <Timer
      active={task.type === 'doing' && (task.timeLeft > 0 || task.overTime > 0)}
      dir={task.timeLeft > 0 ? 'dec' : 'inc'}
      className={`w-fit ml-auto ${task.timeLeft > 0 ? '' : 'text-red-500'}`}
      timeInSeconds={task.timeLeft > 0 ? task.timeLeft : task.overTime}
      showControls={task.timeLeft >= task.estimatedTime}
      onIncreaseControlClick={(setter) => {
        setter((curr) => curr + 60)
        increaseTimeEstimate()
      }}
      onDecreaseControlClick={(setter) => {
        setter((curr) => curr - 60)
        decreaseTimeEstimate()
      }}
      onTimeChange={(newTime) => {
        if (newTime === 0 && !isDonePopupOpen) {
          alertAudio.play()
          setIsDonePopupOpen(true)
        }

        const prop = task.timeLeft > 0 ? 'timeLeft' : 'overTime'

        taskUpdate(task.id, { [prop]: newTime })
      }}
    />
  )
}

export default memo(TaskTimer)
