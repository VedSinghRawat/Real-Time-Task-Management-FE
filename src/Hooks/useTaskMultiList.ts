import { useCallback } from 'react'
import { useShallow } from 'zustand/shallow'
import { Task, TaskType } from '../entities'
import TaskSelectors from '../state/selector/task.selector'
import { Store, useAppStore } from '../state/store'

const indexToType = {
  todo: 0,
  doing: 1,
  done: 2,
}
const selectors = (state: Store) => ({
  addToConfirm: TaskSelectors.base.addToConfirm(state),
  taskMove: TaskSelectors.base.move(state),
})

const useTaskMultiList = (tasks: Task[]) => {
  const { addToConfirm, taskMove } = useAppStore(useShallow(selectors))

  const handleTaskMove = useCallback(
    async (data: { fromIndex: number; fromListId: TaskType; item: Task; toIndex: number; toListId?: TaskType }) => {
      if (data.toListId === 'done') {
        addToConfirm(data.item.id)
      }

      console.log('taskMove', data)
      await taskMove(data.item.id, data.toListId || data.fromListId, data.toIndex + 1)
    },
    [addToConfirm, taskMove]
  )

  const lists: { items: Task[]; id: Task['type'] }[] = [
    { items: [], id: 'todo' },
    { items: [], id: 'doing' },
    { items: [], id: 'done' },
  ]
  tasks.forEach((task) => {
    lists[indexToType[task.type]]!.items[task.position - 1] = task
  })

  return { lists, handleTaskMove }
}

export default useTaskMultiList
