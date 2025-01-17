// const selectors = (state: Store) => ({
//   addToConfirm: TaskSelectors.base.addToConfirm(state),
// })

import { Task } from '../entities'

const indexToType = {
  todo: 0,
  doing: 1,
  done: 2,
}
const useTaskMultiList = (tasks: Task[]) => {
  // const { addToConfirm } = useAppStore(useShallow(selectors))

  // const handleTaskMove = useCallback(
  //   (data: { fromIndex: number; fromListId: TaskType; item: Task; toIndex: number; toListId?: TaskType }) => {
  //     if (data.toListId === 'done') {
  //       addToConfirm(data.item.id)
  //     } else {
  //       taskMove({
  //         fromListType: data.fromListId,
  //         task: data.item,
  //         toOrder: data.toIndex + 1,
  //         toListType: data.toListId,
  //       })
  //     }
  //   },
  //   [taskAddtoToConfirmDone, taskMove]
  // )

  const lists: { items: Task[]; id: Task['type'] }[] = [
    { items: [], id: 'todo' },
    { items: [], id: 'doing' },
    { items: [], id: 'done' },
  ]
  tasks.forEach((task) => {
    lists[indexToType[task.type]]!.items.push(task)
  })

  return { lists }
}

export default useTaskMultiList
