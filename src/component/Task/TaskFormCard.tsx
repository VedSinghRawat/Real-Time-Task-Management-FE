import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { HiXCircle } from 'react-icons/hi'
import { TextArea } from '../UI/Form/TextArea'
import Button from '../UI/Button'
import { HHMMSSToSeconds, TimeString } from '../../utils'
import TimeInput from '../UI/Form/Input/TimeInput'
import { Store, useAppStore } from '../../state/store'
import TaskSelectors from '../../state/selector/task.selector'
import { Task } from '../../entities'
import { useShallow } from 'zustand/shallow'
import { AiFillPlusCircle } from 'react-icons/ai'

type TaskFormCardProps = {
  className?: string
  task?: Task
  position: number
}

const selectors = (state: Store) => ({
  create: TaskSelectors.base.create(state),
  update: TaskSelectors.base.update(state),
  currentId: state.project.currentId,
  meId: state.user.meId,
})

const TaskFormCard: FC<TaskFormCardProps> = ({ task, className = '', position }) => {
  const { create, update, currentId, meId } = useAppStore(useShallow(selectors))
  const [timerValue, setTimerValue] = useState<TimeString | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const toggleTaskForm = useCallback(() => setIsFormOpen((curr) => !curr), [setIsFormOpen])

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = useCallback(() => {
    if (!timerValue) return

    const estimated_time = HHMMSSToSeconds(timerValue)

    if (!estimated_time) return

    const description = textAreaRef.current?.value || ''

    if (!description) return

    task
      ? void update(task.id, { description, estimated_time })
      : void create(
          {
            description,
            estimated_time,
            type: 'todo',
            position,
            time_left: estimated_time,
          },
          currentId!,
          meId!
        )

    toggleTaskForm()
  }, [create, currentId, meId, position, task, timerValue, toggleTaskForm, update])

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [textAreaRef])

  if (!isFormOpen)
    return (
      <Button className={`w-full text-center px-3 text-sm sm:text-lg py-1.5 ml-auto justify-center`} Icon={AiFillPlusCircle} onClick={toggleTaskForm}>
        Add Todo
      </Button>
    )

  return (
    <div
      className={`relative text-sm sm:text-base rounded-xl bg-primary-8 group ${className} focus-within:bg-primary-5 p-2.5 transition-all duration-100 ease-in-out text-secondary-10 focus-within:text-secondary-3`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <TextArea innerRef={textAreaRef} name="description" className={`bg-transparent group-focus-within:outline-primary-10`} />

        <TimeInput getValue={setTimerValue} className={`mt-2 placeholder-opacity-70 bg-transparent`} />

        <Button
          type="submit"
          className={`justify-center mt-2 w-full text-center group-focus-within:outline-primary-6 group-focus-within:text-primary-6`}
          onClick={handleSubmit}
        >
          {task ? 'Update' : 'Add'}
        </Button>
      </form>

      <HiXCircle
        className={`absolute cursor-pointer w-7 h-7 -top-3.5 -right-3.5 bg-secondary-10 rounded-full text-secondary-3`}
        onClick={toggleTaskForm}
      />
    </div>
  )
}

export default memo(TaskFormCard)
