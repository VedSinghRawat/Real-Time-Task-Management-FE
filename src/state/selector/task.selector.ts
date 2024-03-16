import { createSelector } from 'reselect'
import { isAfter, isSameDay, isToday, startOfDay, subDays, subMonths } from 'date-fns'
import { TaskType, Task } from '../../model/Task'
import { TODAY } from '../../constants'
import { createSliceSelectors, taskSliceSelector } from '../selector'
import { TaskSlice } from '../slices/task.slice'

const taskStateInit: TaskSlice = {
  map: {},
  idsToConfirm: [],

  add: () => undefined,
  addToConfirm: () => undefined,
  changeTimer: () => undefined,
  clearConfirm: () => undefined,
  delete: () => undefined,
  move: () => undefined,
  removeFromConfirm: () => undefined,
  update: () => undefined,
}

export default class TaskSelectors {
  public static base = createSliceSelectors('task', taskStateInit, taskSliceSelector)

  static list = createSelector(this.base.map, (map) => Object.values(map))

  static todayList = createSelector(this.list, (list) => list.filter((t) => isToday(t.created_at)))

  static listByType = (type: TaskType) =>
    createSelector(this.todayList, (taskList) => taskList.filter((task) => task.type === type).sort((a, b) => a.order - b.order))

  static setTimer = createSelector(
    taskSliceSelector,
    (state) =>
      [(id: Task['id'], by: number) => state.changeTimer(id, by, 'inc'), (id: Task['id'], by: number) => state.changeTimer(id, by, 'dec')] as const
  )

  static form = createSelector(taskSliceSelector, (state) => [state.add, state.update] as const)

  static totalRemainingTime = createSelector(this.todayList, (taskList) =>
    taskList.reduce((totalTime, task) => {
      if (task.type !== 'done') totalTime += task.timeLeft

      return totalTime
    }, 0)
  )

  static toConfirmList = createSelector([this.base.idsToConfirm, this.base.map], (ids, map) => ids.map((id) => map[id]).filter((t) => !!t) as Task[])

  static dateFilteredList = (filterDate?: Date) =>
    createSelector(this.list, (list) => (filterDate ? list.filter((task) => isSameDay(task.created_at, filterDate)) : []))

  static lastWeekList = createSelector(this.list, (list) => list.filter((t) => isAfter(t.created_at, startOfDay(subDays(TODAY, 7)))))

  static lastMonthList = createSelector(this.list, (list) => list.filter((t) => isAfter(t.created_at, startOfDay(subMonths(TODAY, 1)))))

  static lastSixMonthsList = createSelector(this.list, (list) => list.filter((t) => isAfter(t.created_at, startOfDay(subMonths(TODAY, 6)))))

  static yesterdayLeftList = createSelector(this.list, (list) => list.filter((t) => t.type !== 'done' && isSameDay(t.created_at, subDays(TODAY, 1))))
}
