import '../styles/Navbar.css'

import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/index.js'

export default function Navbar() {
  const auth = useAuth()
  return (
    <nav>
      <input type="checkbox" id="check" />
      <label for="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">Codiel</label>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li><Link to="/post/:postId">Post</Link></li> */}
        <li>
          {auth.user ? <button onClick={auth.logout}>Logout</button>: <Link to="/login">Login</Link> }
        </li>
        <li>
        {!auth.user &&<Link to="/signup">Signup </Link>}
        </li>
        <li>
        {auth.user && <span>{auth.user.name}</span>}
        </li>
        <li>
         {auth.user && <Link to="/setting">Profile</Link>} 
        </li>
      </ul>
    </nav>
  )
}
