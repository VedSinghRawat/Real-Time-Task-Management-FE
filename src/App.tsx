import MultiDraggableListWithContext from './Components/Draggable/MultiList/MultiDraggableListWithContext'

function App() {
  const lists = Array.from({ length: 3 }, (_, i) => {
    return {
      id: Math.trunc(Math.random() * 10000),
      title: `the title of this list is ${i}`,
      items: Array.from({ length: 5 }, (_, j) => {
        return {
          id: Math.trunc(Math.random() * 10000),
          description: `the description for this card is ${j}`,
        }
      }),
    }
  })
  return (
    <MultiDraggableListWithContext
      lists={lists}
      type="multi"
      listsContainerClasses="flex"
      handleItemMove={(data) => {
        console.log(data)
      }}
    >
      {(item) => {
        return <div className={`bg-red-300`}>{item.description}</div>
      }}
    </MultiDraggableListWithContext>
  )
}

export default App
