import { FC, memo, useEffect } from 'react'
import Popup, { PopupProps } from './Popup'
import alert from '../../../assets/audio/alert.wav'

const alertAudio = new Audio(alert)

interface TaskDonePopupProps extends Omit<PopupProps, 'children'> {
  task: Task
}

const TaskDonePopup: FC<TaskDonePopupProps> = ({ task, isOpen, ...rest }) => {
  useEffect(() => {
    isOpen && alertAudio.play()
  }, [isOpen])

  return (
    <Popup {...rest} isOpen={isOpen}>
      <h3>Are you done with this task?</h3>

      <p>{task.description}</p>
    </Popup>
  )
}

export default memo(TaskDonePopup)
