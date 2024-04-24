import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routing/routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes}/>
)
