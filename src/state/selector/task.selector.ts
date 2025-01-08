import { createSelector } from 'reselect'
import { isToday } from 'date-fns'
import { createSliceSelectors, SliceSelectorInitMap, taskSliceSelector } from '../selector'
import { TaskSlice } from '../slices/task.slice'

const taskStateInit: SliceSelectorInitMap<TaskSlice> = {
  map: undefined,
  loading: undefined,
  idsToConfirm: undefined,
  addToConfirm: undefined,
  clearConfirm: undefined,
  delete: undefined,
  removeFromConfirm: undefined,
  update: undefined,
  create: undefined,
  subscribe: undefined,
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

  static form = createSelector(taskSliceSelector, (state) => [state.create, state.update] as const)

  static totalRemainingTime = createSelector(this.todayList, (taskList) =>
    taskList.reduce((totalTime, task) => {
      if (task.type !== 'done') totalTime += task.timeLeft

      return totalTime
    }, 0)
  )

  static toConfirmList = createSelector([this.base.idsToConfirm, this.base.map], (ids, map) => ids.map((id) => map[id]).filter((t) => !!t) as Task[])
}
