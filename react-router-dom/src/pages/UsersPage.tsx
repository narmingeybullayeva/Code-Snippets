import { Outlet } from 'react-router-dom'
import UsersList from '../components/UsersList'

const UsersPage = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <UsersList />
      </div>
      <div className="col-md-6">
        <Outlet />
      </div>
    </div>
  )
}

export default UsersPage