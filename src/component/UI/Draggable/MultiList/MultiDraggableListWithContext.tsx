import { ReactElement, memo } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'

interface MultiDraggableListWithContextProps<T extends { id: number | string }, L extends { items: T[]; id: number | string }> {
  lists: L[]
  handleItemMove: (data: { fromIndex: number; fromListId: L['id']; toIndex: number; toListId?: L['id']; item: L['items'][number] }) => void
  children: (list: L, index: number) => ReactElement
}

const MultiDraggableListWithContext = <T extends { id: number | string }, L extends { items: T[]; id: number | string }>({
  children,
  handleItemMove,
  lists,
}: MultiDraggableListWithContextProps<T, L>) => {
  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (result.destination) {
          const movedFromList = lists.find((list) => list.id.toString() === result.source.droppableId)
          if (!movedFromList) return

          const item = movedFromList.items[result.source.index]
          if (!item) return

          const payload: Parameters<typeof handleItemMove>[0] = {
            fromIndex: result.source.index,
            fromListId: result.source.droppableId,
            toIndex: result.destination.index,
            item,
          }

          if (result.source.droppableId !== result.destination.droppableId) {
            payload.toIndex = result.destination.index
            payload.toListId = result.destination.droppableId
          }

          handleItemMove(payload)
        }
      }}
    >
      {lists.map((list, index) => children(list, index))}
    </DragDropContext>
  )
}

export default memo(MultiDraggableListWithContext) as typeof MultiDraggableListWithContext
