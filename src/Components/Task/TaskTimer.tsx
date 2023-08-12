import { FC, memo } from 'react'
import Timer from '../UI/Timer'
import alert from '../../assets/audio/alert.wav'
import { taskUpdateAction } from '../../Store/task.selector'
import { useTaskStore } from '../../Store/task.store'

const alertAudio = new Audio(alert)

interface TaskTimerProps {
  task: Task
  isDonePopupOpen: boolean
  setIsDonePopupOpen: (arg: boolean) => void
}

const TaskTimer: FC<TaskTimerProps> = ({ task, isDonePopupOpen, setIsDonePopupOpen }) => {
  const taskUpdate = useTaskStore(taskUpdateAction)

  return (
    <Timer
      active={task.type === 'doing' && (task.timeLeft > 0 || task.overTime > 0)}
      dir={task.timeLeft > 0 ? 'dec' : 'inc'}
      onTimeChange={(newTime) => {
        if (newTime === 0 && !isDonePopupOpen) {
          alertAudio.play()
          setIsDonePopupOpen(true)
        }

        const prop = task.timeLeft > 0 ? 'timeLeft' : 'overTime'

        taskUpdate(task.id, { [prop]: newTime })
      }}
      className={`w-fit ml-auto ${task.timeLeft > 0 ? '' : 'text-red-500'}`}
      timeInSeconds={task.timeLeft > 0 ? task.timeLeft : task.overTime}
    />
  )
}

export default memo(TaskTimer)
