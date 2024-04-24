import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="nav bg-secondary p-3">
        <ul className="nav d-flex gap-3">
            <li className="nav-item">
                <NavLink className='nav-link text-light' to="/">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className='nav-link text-light' to="/about">About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className='nav-link text-light' to="/users">Users</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar