import { memo } from 'react'
import MultiDraggableList, { MultiDraggableListProps } from './MultiDraggableList'
import { DragDropContext } from 'react-beautiful-dnd'

interface MultiDraggableListWithContextProps<T extends { id: number }, L extends { items: T[]; id: number }> extends MultiDraggableListProps<T, L> {
  containerClasses?: string
  handleItemMove: (data: { fromIndex: number; toIndex: number; fromListId?: number; toListId?: number; item: T }) => void
}

const MultiDraggableListWithContext = <T extends { id: number }, L extends { items: T[]; id: number }>({
  containerClasses,
  handleItemMove,
  lists,
  ...rest
}: MultiDraggableListWithContextProps<T, L>) => {
  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (result.destination) {
          const movedFromList = lists.find((list) => list.id.toString() === result.source.droppableId)
          if (movedFromList) {
            const item = movedFromList.items[result.source.index]

            if (result.source.droppableId !== result.destination.droppableId) {
              handleItemMove({
                fromIndex: result.source.index,
                toIndex: result.destination.index,
                fromListId: +result.source.droppableId,
                toListId: +result.destination.droppableId,
                item,
              })
            } else {
              handleItemMove({
                fromIndex: result.source.index,
                toIndex: result.destination.index,
                item,
              })
            }
          }
        }
      }}
    >
      <MultiDraggableList lists={lists} {...rest}></MultiDraggableList>
    </DragDropContext>
  )
}

export default memo(MultiDraggableListWithContext) as typeof MultiDraggableListWithContext
