import { useParams } from 'react-router-dom'



const UserDetail = () => {
  
    const {id} = useParams() 
  
  return (
    <div>User {id}</div>
  )
}

export default UserDetail