import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './component/UI/NavBar'

const App: FC = () => {
  return (
    <>
      <NavBar />

      <div className="px-8 py-4">
        <Outlet />
      </div>
    </>
  )
}

export default App

// TODO: Add a side bar/ floating thingy in the project page to show the users in the project
// TODO: Add feature of letting users have profile picture
// TODO: Make the tasks in doing list active only if the corresponding user is logged in
// FIXME: Fix the add task form
// TODO: Add the feature to update the task description
// TODO: Add the feature to assign a task to a user
