import { memo } from 'react'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import DraggableList, { DraggableListProps } from './DraggableList'

interface DraggableListWithContextProps<T extends { id: number }> extends DraggableListProps<T> {
  type: string
  handleItemMove: (data: { fromIndex: number; toIndex: number; item: T }) => void
  extendOnDrag?: (result: DropResult, provided: ResponderProvided) => void
  getUpdatedOrderedIds?: (orderedIds?: (string | number)[]) => void
}

const DraggableListWithContext = <T extends { id: number }>({
  items,
  type,
  extendOnDrag,
  getUpdatedOrderedIds,
  handleItemMove,
  ...rest
}: DraggableListWithContextProps<T>) => {
  return (
    <DragDropContext
      onDragEnd={(result, provided) => {
        extendOnDrag && extendOnDrag(result, provided)

        if (result.type === type && result.destination) {
          handleItemMove({ fromIndex: result.source.index, toIndex: result.destination.index, item: items[result.source.index] })
        }
      }}
    >
      <DraggableList {...rest} items={items} type={type} />
    </DragDropContext>
  )
}

export default memo(DraggableListWithContext) as typeof DraggableListWithContext
