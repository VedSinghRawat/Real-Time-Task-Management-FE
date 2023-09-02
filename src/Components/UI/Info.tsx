import { FC, memo, useState } from 'react'
import { taskTotalRemainingTime, taskTypedListSelector, taskListSelector } from '../../Store/task.selector'
import { useTaskStore } from '../../Store/task.store'
import { secondsToHHMMSS } from '../../utils'
import { FaHistory } from 'react-icons/fa'
import { MdToday } from 'react-icons/md'
import NavLink from './NavLink'
import DatePickerPopup from './Popups/DatePickerPopup'

interface InfoProps {}

const Info: FC<InfoProps> = ({}) => {
  const totalRemainingTime = useTaskStore(taskTotalRemainingTime)
  const doneTaskList = useTaskStore(taskTypedListSelector('done'))
  const taskList = useTaskStore(taskListSelector)

  const qs = new URLSearchParams(window.location.search)
  const { history } = Object.fromEntries(qs.entries())

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  return (
    <div className={`text-center my-6 text-secondary-600 max-w-[100vw] sticky inset-x-0`}>
      <h1 className={`text-2xl`}>Total Estimated Time:</h1>

      <p className={`text-3xl`}>{secondsToHHMMSS(totalRemainingTime)}</p>

      <div className={`flex justify-around mt-3 items-center`}>
        <h2 className={`text-2xl`}>
          Done{' '}
          <span className={`text-3xl`}>
            {doneTaskList.length}/{taskList.length}
          </span>
        </h2>

        <div>
          {!history && (
            <NavLink className={`px-6 min-w-[8rem] max-w-max mb-1.5`} Icon={MdToday}>
              Today
            </NavLink>
          )}

          <NavLink Icon={FaHistory} className={`px-6 min-w-[8rem] max-w-max`} onClick={() => setIsDatePickerOpen(true)}>
            History
          </NavLink>
        </div>
      </div>

      <DatePickerPopup
        onChange={(newDate, [_, setDate]) => {
          setIsDatePickerOpen(false)

          if (newDate) {
            window.location.replace(`${window.location.pathname}?h=${newDate.toISOString()}`)

            setDate(newDate)
          }
        }}
        isOpen={isDatePickerOpen}
        setIsOpen={setIsDatePickerOpen}
      />
    </div>
  )
}

export default memo(Info)
