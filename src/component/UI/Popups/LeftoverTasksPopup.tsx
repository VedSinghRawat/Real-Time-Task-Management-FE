import { FC, memo, useCallback, useState } from 'react'
import { useTaskStore } from '../../../state/store/task.store'
import { taskAddActionSelector, taskYesterdayLeftoverListSelector } from '../../../state/selector/task.selector'
import Popup from './Popup'
import Button from '../Button'
import { isSameDay } from 'date-fns'
import { LOCAL_STORAGE_LEFTOVER_DATE, TODAY } from '../../../constants'

interface LeftoverTasksProps {}

const LeftoverTasks: FC<LeftoverTasksProps> = () => {
  const addTask = useTaskStore(taskAddActionSelector)
  const yesterdayTasks = useTaskStore(taskYesterdayLeftoverListSelector)

  let interactedOn: Date | string | null = localStorage.getItem(LOCAL_STORAGE_LEFTOVER_DATE)
  if (interactedOn) interactedOn = new Date(interactedOn)

  const [isOpen, setIsOpen] = useState(!isSameDay(TODAY, new Date(interactedOn!)) && !!yesterdayTasks.length)

  const actionChosen = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_LEFTOVER_DATE, TODAY.toString())
  }, [])

  return (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen} onClose={actionChosen}>
      <div className={`flex flex-col items-center text-lg`}>
        <p>Would you like to copy over tasks you could not complete yesterday?</p>

        <Button
          className={`mt-4 px-8 mx-auto`}
          onClick={() => {
            yesterdayTasks.forEach((t) => addTask({ description: t.description, estimatedTime: t.timeLeft }))
            actionChosen()
            setIsOpen(false)
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}

export default memo(LeftoverTasks)
