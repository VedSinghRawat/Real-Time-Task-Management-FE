import { FC, memo, useCallback, useMemo } from 'react'
import Timer from '../UI/Timer'
import alert from '../../assets/audio/alert.wav'
import { Task } from '../../model/Task'
import { useAppStore } from '../../state/store'
import TaskSelectors from '../../state/selector/task.selector'

const alertAudio = new Audio(alert)

interface TaskTimerProps {
  task: Task
}

const TaskTimer: FC<TaskTimerProps> = ({ task }) => {
  const taskUpdate = useAppStore(TaskSelectors.base.update)

  const taskAddtoToConfirmDone = useAppStore(TaskSelectors.base.addToConfirm)
  const taskToConfirmDoneIds = useAppStore(TaskSelectors.base.idsToConfirm)

  const [inc, dec] = useAppStore(TaskSelectors.setTimer)
  const [increaseTimeEstimate, decreaseTimeEstimate] = useMemo(() => [() => inc(task.id, 60), () => dec(task.id, 60)], [dec, inc, task.id])

  const handleTimeChange: (newTime: number) => void = useCallback(
    (newTime) => {
      if (newTime === 0 && !taskToConfirmDoneIds.includes(task.id)) {
        void alertAudio.play()
        taskAddtoToConfirmDone(task.id)
      }

      const prop = task.timeLeft > 0 ? 'timeLeft' : 'overTime'
      taskUpdate(task.id, { [prop]: newTime })
    },
    [task.id, task.timeLeft, taskAddtoToConfirmDone, taskToConfirmDoneIds, taskUpdate]
  )

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
      onTimeChange={handleTimeChange}
    />
  )
}

export default memo(TaskTimer)
