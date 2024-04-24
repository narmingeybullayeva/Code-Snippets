import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import UsersPage from "../pages/UsersPage"
import Layout from "../Layout"
import UserDetail from '../components/UserDetail'
import ErrorPage from '../pages/ErrorPage'
import LoginPage from '../pages/LoginPage'
import PrivateRoutes from './PrivateRoutes'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "login", element: <LoginPage /> },
      
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      { 
        path: "users", 
        element: <UsersPage />,
        children: [
          {path: ':id', element: <UserDetail/>}
        ] },
    ]
  }
])

export default routes
