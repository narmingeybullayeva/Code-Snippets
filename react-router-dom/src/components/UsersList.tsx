import { Link } from 'react-router-dom'

const users = [
    {id: 1, name:'John'},
    {id: 2, name:'Alice'},
    {id: 3, name:'Kendall'},
]

const UsersList = () => {
  return (
    <div>
        {users.map(user => 
            <ul key={user.id}>
                <li>
                  <Link to={`${user.id}`}>{user.name}</Link>
                </li>
            </ul>
        )}
    </div>
  )
}

export default UsersList