import { FC, memo } from 'react'
import TextArea from '../UI/Form/TextArea'
import Timer from '../UI/Timer'

interface TaskCardProps {
  description: string
}

const TaskCard: FC<TaskCardProps> = ({}) => {
  return (
    <div
      className={`rounded-xl bg-primary-800 w-fit group focus-within:bg-secondary-600 p-4 transition-all duration-100 ease-in-out text-tertiary-600  focus-within:text-tertiary-800`}
    >
      <TextArea className={`bg-transparent group-focus-within:outline-primary-800 `} />

      <div className={`mt-4`}>
        {/* <Input
          className={`bg-transparent w-1/2 group-focus-within:outline-primary-800 placeholder-tertiary-600 group-focus-within:placeholder-tertiary-800`}
          placeholder="HH:MM:SS"
        /> */}
        {/* <Button Icon={BsFillClockFill} className={`group-focus-within:outline-primary-800 ml-auto`}>
          Add a Timer
        </Button> */}
        <Timer timeInSeconds={1000} className={`font-semibold`} />
      </div>
    </div>
  )
}

export default memo(TaskCard)
