import React from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

import useDetectViewport from 'hooks/useDetectVieport'
import { Dialog } from 'components'
import {
  container,
  active,
  removeSpaceR,
  menuOpenButton,
  menuCloseButton,
  mobileOnly,
  gteMd,
  ltMd,
} from './Navigation.module.scss'

/* react redux: connect + action creators ----------------------------------- */

import { connect } from 'react-redux'
import { signInAction, signOutAction } from 'redux/storage/auth/auth'

const mapStateToProps = ({ auth: { authUser, isAuthed } }) => ({
  authUser,
  isAuthed,
})

const mapDispatchToProps = {
  onSignIn: signInAction,
  onSignOut: signOutAction,
}

/* dummy authUser ----------------------------------------------------------- */

const dummyAuthUser = {
  uid: '0FIAXz7FlGRhQlkuydyM5Vwv0bc2',
  displayName: '야무',
  photoURL: 'https://bit.ly/3f91TZy',
  email: 'yamoo9@euid.dev',
}

/* component ---------------------------------------------------------------- */

function Navigation({ authUser, isAuthed, onSignIn, onSignOut, children }) {
  // ------------------------------------------------------------------------
  // 내비게이션 활성
  const history = useHistory()
  const location = useLocation()
  const isMoviePageActive = location.pathname.match(/movie/) ? true : false
  const activeClassName = isMoviePageActive ? active : null

  // ------------------------------------------------------------------------
  // 글로벌 내비게이션

  const [isOpen, setIsOpen] = React.useState(false)
  const handleOpenMenu = () => setIsOpen(true)
  const handleCloseMenu = () => setIsOpen(false)

  // ------------------------------------------------------------------------
  // 모바일 내비게이션 메뉴 애니메이션

  const navRef = React.useRef(null)
  const handleAnimationStart = () => (navRef.current.style.display = 'flex')
  const handleAnimationComplete = ({ scale }) => {
    if (scale === 0) {
      navRef.current.style.display = 'none'
    }
  }

  // ------------------------------------------------------------------------
  // 디바이스 모드 감지

  const { isMobile } = useDetectViewport()

  React.useEffect(() => {
    isMobile && handleCloseMenu()
  }, [isMobile, location])

  // ------------------------------------------------------------------------
  // 다이얼로그

  const [isDialogShow, setIsDialogShow] = React.useState(false)
  const showDialog = () => setIsDialogShow(true)
  const hideDialog = () => setIsDialogShow(false)

  return (
    <>
      <Dialog
        visible={isDialogShow}
        // onOpen={() => console.log('open')}
        // onClose={() => console.log('close')}
        // onDimClickClose={() => hideDialog()}
      >
        <Dialog.Body>
          <Dialog.CloseButton onClick={hideDialog} />
        </Dialog.Body>
      </Dialog>

      {/* 메뉴 열기 버튼 */}
      <button
        type="button"
        className={`${menuOpenButton} ${mobileOnly}`.trim()}
        aria-label="내비게이션 메뉴 열기"
        onClick={handleOpenMenu}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>

      {/* 내비게이션 */}
      <AnimatePresence>
        <motion.nav
          ref={navRef}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          initial={isMobile ? { scale: 0 } : null}
          animate={
            isMobile
              ? {
                  scale: isOpen ? 1 : 0,
                  opacity: isOpen ? 1 : 0,
                }
              : null
          }
          className={`${container} ${!isMobile ? gteMd : ltMd}`.trim()}
          aria-label="글로벌 내비게이션"
        >
          <ul lang="en" className={!isAuthed ? removeSpaceR : null}>
            {isMobile && (
              <li>
                <NavLink to="/" activeClassName={active} exact>
                  Home
                </NavLink>
              </li>
            )}
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
                      onSignIn(dummyAuthUser)
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
                      showDialog()
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
                      history.push('/')
                      onSignOut()
                    }}
                  >
                    Sign Out
                  </a>
                </li>
              </>
            )}
          </ul>
          {isAuthed && children}

          {/* 메뉴 닫기 버튼 */}
          <button
            type="button"
            className={`${menuCloseButton} ${mobileOnly}`}
            aria-label="내비게이션 메뉴 닫기"
            onClick={handleCloseMenu}
          >
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
        </motion.nav>
      </AnimatePresence>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
