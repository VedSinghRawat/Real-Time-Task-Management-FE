/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, memo, useState } from 'react'
import Popup from './Popup'
import Button from '../Button'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { HiXCircle } from 'react-icons/hi'
import { taskRemoveToConfirmDoneActionSelector, taskUpdateAction } from '../../../Store/task.selector'
import { useTaskStore } from '../../../Store/task.store'
import { Task } from '../../../Model/Task'

interface TaskDonePopupProps {
  task: Task
}

const TaskDonePopup: FC<TaskDonePopupProps> = ({ task }) => {
  const taskUpdate = useTaskStore(taskUpdateAction)
  const removeTaskToConfimDone = useTaskStore(taskRemoveToConfirmDoneActionSelector)

  const [isOpen] = useState(true)

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Popup isOpen={isOpen} setIsOpen={() => {}} className={`font-semibold text-tertiary-700`}>
      <h3>
        Are you <span className={`text-primary-700 font-bold`}>DONE</span> with this task?
      </h3>

      <pre className={`mt-4 whitespace-break-spaces`}>{task.description}</pre>

      <div className={`flex justify-around mt-10`}>
        <Button
          Icon={BsFillCheckCircleFill}
          className={`flex-row-reverse !outline-primary-800 !text-primary-700`}
          onClick={() => {
            taskUpdate(task.id, { type: 'done' })

            removeTaskToConfimDone(task.id)
          }}
        >
          YES
        </Button>

        <Button
          Icon={HiXCircle}
          className={`!bg-red-500 flex-row-reverse !outline-primary-800 !text-primary-700`}
          iconClasses="h-5 w-5"
          onClick={() => {
            task.overTime === 0 && taskUpdate(task.id, { overTime: 1 })

            removeTaskToConfimDone(task.id)
          }}
        >
          CONTINUE
        </Button>
      </div>
    </Popup>
  )
}

export default memo(TaskDonePopup)
