import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import TodayPage from './pages/App/Today.Page.tsx'
import HistoryPage from './pages/App/History.Page.tsx'
import DashboardPage from './pages/App/Dashboard.Page.tsx'
import LoginPage from './pages/Auth/Login.Page.tsx'
import Root from './component/Root.tsx'

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
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />)
