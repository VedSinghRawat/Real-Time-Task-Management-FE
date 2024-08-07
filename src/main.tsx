import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import TodayPage from './pages/App/Today.Page.tsx'
import HistoryPage from './pages/App/History.Page.tsx'
import DashboardPage from './pages/App/Dashboard.Page.tsx'
import Root from './component/Root.tsx'
import TestPage from './pages/Test.Page.tsx'
import RegisterPage from './component/Pages/Auth/RegisterForm.tsx'
import AuthContainer from './component/Pages/Auth/AuthContainer.tsx'
import LoginForm from './component/Pages/Auth/LoginForm.tsx'
import ProjectsPage from './pages/App/Projects.Page.tsx'

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: 'app',
        element: <App />,
        children: [
          {
            path: '',
            element: <ProjectsPage />,
          },
          {
            // TODO: change the route
            path: 'today',
            element: <TodayPage />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: ':history',
            element: <HistoryPage />,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthContainer />,
        children: [
          {
            path: 'login',
            element: <LoginForm />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: 'test',
        element: <TestPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />)
