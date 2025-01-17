import { memo } from 'react'
import { DragDropContext, DropResult, ResponderProvided } from '@hello-pangea/dnd'
import DraggableList, { DraggableListProps } from './DraggableList'

interface DraggableListWithContextProps<T extends { id: number }> extends DraggableListProps<T> {
  type: string
  handleItemMove: (data: { fromIndex: number; toIndex: number; item: T }) => void
  extendOnDrag?: (result: DropResult, provided: ResponderProvided) => void
}

const DraggableListWithContext = <T extends { id: number }>({
  items,
  type,
  extendOnDrag,
  handleItemMove,
  ...rest
}: DraggableListWithContextProps<T>) => {
  return (
    <DragDropContext
      onDragEnd={(result, provided) => {
        extendOnDrag && extendOnDrag(result, provided)

        const item = items[result.source.index]
        if (result.type === type && result.destination && item) {
          handleItemMove({ fromIndex: result.source.index, toIndex: result.destination.index, item })
        }
      }}
    >
      <DraggableList {...rest} items={items} type={type} />
    </DragDropContext>
  )
}

export default memo(DraggableListWithContext) as typeof DraggableListWithContext
