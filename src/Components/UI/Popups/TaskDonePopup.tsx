import { FC, memo } from 'react'
import Popup, { PopupProps } from './Popup'
import Button from '../Button'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { HiXCircle } from 'react-icons/hi'
import { taskUpdateAction } from '../../../Store/task.selector'
import { useTaskStore } from '../../../Store/task.store'

interface TaskDonePopupProps extends Omit<PopupProps, 'children'> {
  task: Task
}

const TaskDonePopup: FC<TaskDonePopupProps> = ({ task, setIsOpen, ...rest }) => {
  const taskUpdate = useTaskStore(taskUpdateAction)

  return (
    <Popup {...rest} setIsOpen={setIsOpen} className={`font-semibold text-tertiary-700`}>
      <h3>
        Are you <span className={`text-primary-700 font-bold`}>DONE</span> with this task?
      </h3>

      <pre className={`mt-4`}>{task.description}</pre>

      <div className={`flex justify-around mt-10`}>
        <Button
          Icon={BsFillCheckCircleFill}
          className={`flex-row-reverse !outline-primary-800 !text-primary-700`}
          onClick={() => {
            taskUpdate(task.id, { type: 'done' })
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

            setIsOpen(false)
          }}
        >
          CONTINUE
        </Button>
      </div>
    </Popup>
  )
}

export default memo(TaskDonePopup)
