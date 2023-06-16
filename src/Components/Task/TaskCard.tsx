import { FC, memo } from 'react'
import { BsFillClockFill } from 'react-icons/bs'
import TextArea from '../UI/Form/TextArea'
import Button from '../UI/Button'

interface TaskCardProps {
  description: string
}

const TaskCard: FC<TaskCardProps> = ({}) => {
  return (
    <div
      className={`rounded-xl bg-primary-800 w-fit group focus-within:bg-secondary-600 p-4 transition-all duration-100 ease-in-out text-tertiary-600 focus-within:text-tertiary-800`}
    >
      <TextArea className={`bg-transparent group-focus-within:outline-primary-800`} />

      <div className={`mt-4`}>
        <Button Icon={BsFillClockFill} className={`group-focus-within:outline-primary-800 ml-auto`}>
          Add a Timer
        </Button>
      </div>
    </div>
  )
}

export default memo(TaskCard)
