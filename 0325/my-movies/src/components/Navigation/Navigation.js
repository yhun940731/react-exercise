import { NavLink, useLocation } from 'react-router-dom'
import { container, active } from './Navigation.module.scss'

/* -------------------------------------------------------------------------- */

export default function Navigation({ children }) {
  const location = useLocation()

  const isActive = !!location.pathname.match(/^\/movie/)

  return (
    <nav className={container} aria-label="글로벌 내비게이션">
      <ul lang="en">
        <li>
          <NavLink className={isActive ? active : null} to="/movies">
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={active} to="/bookmark">
            Bookmark
          </NavLink>
        </li>
      </ul>
      {children}
    </nav>
  )
}
