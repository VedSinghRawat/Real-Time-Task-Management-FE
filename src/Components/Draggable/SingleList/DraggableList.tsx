import { ReactElement, memo } from 'react'
import { Draggable, Droppable, DroppableProps } from 'react-beautiful-dnd'

export interface DraggableListProps<T extends { id: number }> extends Omit<DroppableProps, 'children'> {
  items: T[]
  children: (item: T, index: number) => ReactElement
  itemContianerClasses?: string
  className?: string
}

const DraggableList = <T extends { id: number }>({
  items,
  children,
  className = '',
  itemContianerClasses = '',
  type,
  ...rest
}: DraggableListProps<T>) => {
  return (
    <Droppable {...rest} type={type}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={`${className} h-fit`}>
          {items.map((item, i) => (
            <Draggable draggableId={item.id.toString()} key={item.id.toString()} index={i}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className={`${itemContianerClasses}`}>
                  {children(item, i)}
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default memo(DraggableList) as typeof DraggableList
