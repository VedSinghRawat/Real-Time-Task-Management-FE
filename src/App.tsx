import TaskCard from './Components/Task/TaskCard'

const task: Task = { id: Math.trunc(Math.random() * 1000), description: '' }

function App() {
  return (
    <div className={`bg-primary-700 h-full w-full p-10`}>
      <TaskCard
        task={task}
        setTaskTimer={(newTime) => {
          task.estimatedTime = newTime
        }}
      />
    </div>
  )
}

export default App
