import { FC, memo, useCallback } from 'react'
import Timer from '../UI/Timer'
import { Store, useAppStore } from '../../state/store'
import TaskSelectors from '../../state/selector/task.selector'
import { useShallow } from 'zustand/shallow'
import { Task } from '../../entities'

const alertAudio = new Audio('/assets/audio/alert.wav')

interface TaskTimerProps {
  task: Task
}

const selectors = (state: Store) => ({
  update: TaskSelectors.base.update(state),
  addToToConfirm: TaskSelectors.base.addToConfirm(state),
  toConfirmDoneIds: TaskSelectors.base.idsToConfirm(state),
})

const TaskTimer: FC<TaskTimerProps> = ({ task }) => {
  const { update, addToToConfirm, toConfirmDoneIds } = useAppStore(useShallow(selectors))

  const handleTimeChange: (newTime: number) => void = useCallback(
    (newTime) => {
      if (newTime === 0 && !toConfirmDoneIds.includes(task.id)) {
        void alertAudio.play()
        addToToConfirm(task.id)
      }

      const prop = task.time_left > 0 ? 'time_left' : 'over_time'
      void update(task.id, { [prop]: newTime })
    },
    [addToToConfirm, task.id, task.time_left, toConfirmDoneIds, update]
  )

  return (
    <Timer
      active={task.type === 'doing' && (task.time_left > 0 || task.over_time > 0)}
      dir={task.time_left > 0 ? 'dec' : 'inc'}
      className={`w-fit ml-auto ${task.time_left > 0 ? '' : 'text-red-500'}`}
      timeInSeconds={task.time_left > 0 ? task.time_left : task.over_time}
      showControls={task.time_left >= task.estimated_time}
      onIncreaseControlClick={(setter) => {
        setter((curr) => curr + 60)
        void update(task.id, { estimated_time: task.estimated_time + 60 })
      }}
      onDecreaseControlClick={(setter) => {
        setter((curr) => curr - 60)
        void update(task.id, { estimated_time: task.estimated_time - 60 })
      }}
      onTimeChange={handleTimeChange}
    />
  )
}

export default memo(TaskTimer)
