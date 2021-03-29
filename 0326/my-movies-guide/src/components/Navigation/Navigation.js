import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { container, active, removeSpaceR } from './Navigation.module.scss'

/* -------------------------------------------------------------------------- */

export default function Navigation({
  isAuthed,
  onSignIn,
  onSignOut,
  children,
}) {
  const history = useHistory()
  const location = useLocation()

  const isMoviePageActive = location.pathname.match(/movie/) ? true : false
  const activeClassName = isMoviePageActive ? active : null

  return (
    <nav className={container} aria-label="글로벌 내비게이션">
      <ul lang="en" className={!isAuthed && removeSpaceR}>
        <li>
          <NavLink to="/movies" className={activeClassName}>
            Movies
          </NavLink>
        </li>
        {!isAuthed ? (
          <>
            <li>
              <a
                role="button"
                href="#sign-in"
                onClick={(e) => {
                  e.preventDefault()
                  onSignIn()
                }}
              >
                Sign In
              </a>
            </li>
            <li>
              <a
                role="button"
                href="#sign-up"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                Sign Up
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/bookmark" activeClassName={active}>
                Bookmark
              </NavLink>
            </li>
            <li>
              <a
                role="button"
                href="#sign-out"
                onClick={(e) => {
                  e.preventDefault()
                  onSignOut()
                  history.push('/')
                }}
              >
                Sign Out
              </a>
            </li>
          </>
        )}
      </ul>
      {children}
    </nav>
  )
}
