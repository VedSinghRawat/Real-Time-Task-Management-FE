import { ReactElement, memo } from 'react'
import DraggableList from '../SingleList/DraggableList'

export interface MultiDraggableListProps<T extends { id: number }, L extends { items: T[]; id: number }> {
  lists: L[]
  type: string
  children: (item: L['items'][number], index: number) => ReactElement
  listHeader?: (list: L) => ReactElement
  listFooter?: (list: L) => ReactElement
  listClasses?: string
  listsContainerClasses?: string
  listItemContainerClasses?: string
}

const MultiDraggableList = <T extends { id: number }, L extends { items: T[]; id: number }>({
  lists,
  listsContainerClasses,
  children,
  listClasses = '',
  listItemContainerClasses = '',
  listFooter,
  listHeader,
  type,
}: MultiDraggableListProps<T, L>) => {
  return (
    <div className={`${listsContainerClasses}`}>
      {lists.map((list) => (
        <div key={list.id}>
          {listHeader && listHeader(list)}

          <DraggableList
            type={type}
            items={list.items}
            className={`${listClasses}`}
            itemContianerClasses={`${listItemContainerClasses}`}
            direction="vertical"
            droppableId={list.id.toString()}
          >
            {children}
          </DraggableList>

          {listFooter && listFooter(list)}
        </div>
      ))}
    </div>
  )
}

export default memo(MultiDraggableList) as typeof MultiDraggableList
