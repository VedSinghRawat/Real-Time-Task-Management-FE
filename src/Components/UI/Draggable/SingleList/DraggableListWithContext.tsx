import { memo, useRef } from 'react'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import DraggableList, { DraggableListProps } from './DraggableList'
import { difference } from 'lodash'
import { isArrayOrderingDiff } from '../../../utils'

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
  const oldItems = useRef(items).current

  return (
    <DragDropContext
      onDragEnd={(result, provided) => {
        extendOnDrag && extendOnDrag(result, provided)

        if (result.type === type && result.destination) {
          handleItemMove({ fromIndex: result.source.index, toIndex: result.destination.index, item: items[result.source.index] })
        }

        if (getUpdatedOrderedIds) {
          const [oldIds, newIds] = [items, oldItems].map((items) => items.map((item) => item.id))

          if (oldIds.length < newIds.length) getUpdatedOrderedIds(newIds)
          else if (difference(newIds, oldIds).length) getUpdatedOrderedIds(newIds)
          else if (oldIds.length === newIds.length) {
            const diff = isArrayOrderingDiff(oldIds, newIds)

            getUpdatedOrderedIds(diff ? newIds : undefined)
          }
        }
      }}
    >
      <DraggableList {...rest} items={items} type={type} />
    </DragDropContext>
  )
}

export default memo(DraggableListWithContext) as typeof DraggableListWithContext
