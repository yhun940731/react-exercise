import { Link } from 'react-router-dom'
import { container } from './Navigation.module.scss'

/* -------------------------------------------------------------------------- */

export default function Navigation({ children }) {
  return (
    <nav className={container} aria-label="글로벌 내비게이션">
      <ul lang="en">
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/bookmark">Bookmark</Link>
        </li>
      </ul>
      {children}
    </nav>
  )
}
