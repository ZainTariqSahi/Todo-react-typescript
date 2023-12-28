import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav style={{display:'flex',gap:'1rem'}}>

        <Link to={'/'}>All</Link>
        <Link to="/?todos=active">Active</Link>
        <Link to="/?todos=completed">Completed</Link>
        </nav>
  )
}

export default Nav