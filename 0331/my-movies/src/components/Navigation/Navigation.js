import React from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { AvatarGenerator } from 'random-avatar-generator'

import { useDetectViewport, useStateCallback } from 'hooks'
import { SignInForm, SignUpForm } from 'containers'
import { Dialog, LazyLoadingImg } from 'components'

/* style -------------------------------------------------------------------- */

import { ButtonContainer, GoogleButton } from './Navigation.styled'
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

/* firebase api ------------------------------------------------------------- */

import {
  auth,
  signInGoogle,
  signOut,
  createOrGetAuthUser,
  signUpWithEmailAndPassword,
} from 'api/firebase'

/* redux connect ------------------------------------------------------------ */

import { connect } from 'react-redux'
import {
  selectAuth,
  signInAction,
  signOutAction,
} from 'redux/storage/auth/auth'

const mapStateToProps = (state) => {
  const { authUser, isAuthed } = selectAuth(state)
  return {
    authUser,
    isAuthed,
  }
}

const mapDispatchToProps = {
  onSignIn: signInAction,
  onSignOut: signOutAction,
}

/* random avatar generator -------------------------------------------------- */

const generator = new AvatarGenerator()

/* dummy authUser ----------------------------------------------------------- */

// eslint-disable-next-line no-unused-vars
const dummyAuthUser = {
  displayName: '야무',
  uid: '0FIAXz7FlGRhQlkuydyM5Vwv0bc2',
  photoURL: 'https://bit.ly/3f91TZy',
  email: 'yamoo9@euid.dev',
}

/* component ---------------------------------------------------------------- */

function Navigation({ authUser, isAuthed, onSignIn, onSignOut, children }) {
  // firebase 인증 상태 변경 관찰
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        //
        const userDocRef = await createOrGetAuthUser(currentUser)
        // 스냅샷(데이터를 가진)이 변경 됨을 감지하는 이벤트 핸들링
        userDocRef.onSnapshot((snapshot) => {
          // authUser를 디스패치하여 Redux에 업데이트
          onSignIn(snapshot.data())
        })
      } else {
        onSignOut()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [onSignIn, onSignOut])

  // ------------------------------------------------------------------------
  // 내비게이션 활성 클래스

  const history = useHistory()
  const location = useLocation()
  const isMoviePageActive = location.pathname.match(/movie/) ? true : false
  const activeClassName = isMoviePageActive ? active : null

  // ------------------------------------------------------------------------
  // 모바일 내비게이션

  // 메뉴 열기,닫기
  const [isOpen, setIsOpen] = React.useState(false)
  const handleOpenMenu = () => setIsOpen(true)
  const handleCloseMenu = () => setIsOpen(false)

  // 디바이스 모드 감지
  const { isMobile } = useDetectViewport()

  // 모바일 환경에서 URL 변경 시, 메뉴 닫기 설정
  React.useEffect(() => {
    isMobile && handleCloseMenu()
  }, [isMobile, location])

  // 메뉴 애니메이션
  const navRef = React.useRef(null)
  const handleAnimationStart = () => (navRef.current.style.display = 'flex')
  const handleAnimationComplete = ({ scale }) => {
    if (scale === 0) {
      navRef.current.style.display = 'none'
    }
  }

  // ------------------------------------------------------------------------
  // 다이얼로그 (모달)

  const [isDialogShow, setIsDialogShow] = React.useState(false)

  const showDialog = () => {
    setIsDialogShow(true)
  }

  const hideDialog = () => {
    setIsDialogShow(false)
  }

  // ------------------------------------------------------------------------
  // 폼 ← 다이얼로그 (모달)
  // 회원가입/로그인 이벤트 리스너

  const [dialogLabel, setDialogLabel] = useStateCallback('')

  // `회원가입` 이벤트 리스너
  const handleSignUp = (e) => {
    e.preventDefault()
    setDialogLabel('회원가입')
    showDialog()
  }
  // `로그인` 이벤트 리스너
  const handleSignIn = (e) => {
    e.preventDefault()
    setDialogLabel('로그인')
    showDialog()
  }
  // `로그아웃` 이벤트 리스너
  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      // Firebase에 로그아웃 요청
      await signOut()

      // 로그아웃 액션 디스패치
      onSignOut()
      // URL 홈페이지로 변경
      history.push('/')
    } catch (error) {
      throw new Error('로그아웃 실패:', error.message)
    }
  }

  // 폼 전송 이벤트 리스너
  const handleSubmit = (formdata) => {
    for (let [key, value] of formdata.entries()) {
      console.log(`%c${key} → ${value}`, 'font-weight: bold')
    }
  }

  const handleSignUpSubmit = async (formdata) => {
    // for (let [key, value] of formdata.entries()) {
    //   console.log(`%c${key} → ${value}`, 'font-weight: bold')
    // }
    // formdata.entries() // [[key, value], ...]
    const { displayName, email, password } = Object.fromEntries(
      formdata.entries()
    )

    await signUpWithEmailAndPassword(email, password, {
      displayName,
      photoURL: generator.generateRandomAvatar(displayName),
    })
  }

  // ------------------------------------------------------------------------
  // 렌더링

  return (
    <>
      {/* 다이얼로그(모달) */}
      <Dialog
        aria-label={`${dialogLabel} 모달 다이얼로그`}
        visible={isDialogShow}
        style={{ paddingTop: 50 }}
      >
        <Dialog.Body>
          {/* 회원가입, 로그인 폼 */}
          {dialogLabel.includes('로그인') ? (
            <SignInForm onSubmit={handleSubmit} />
          ) : (
            <SignUpForm onSubmit={handleSignUpSubmit} />
          )}
          {/* Google 인증 공급자 버튼 */}
          <ButtonContainer>
            <GoogleButton onClick={signInGoogle}>
              <LazyLoadingImg
                src="https://bit.ly/3dfNgkv"
                alt="Google"
                style={{
                  display: 'inline-block',
                  verticalAlign: -6,
                  height: 24,
                  width: 24,
                  borderRadius: 50,
                }}
              />{' '}
              {dialogLabel}
            </GoogleButton>
          </ButtonContainer>
          {/* 다이얼로그(모달) 닫기 버튼 */}
          <Dialog.CloseButton onClick={hideDialog} />
        </Dialog.Body>
      </Dialog>

      {/* 모바일 내비게이션 메뉴 열기 버튼 */}
      <button
        type="button"
        className={`${menuOpenButton} ${mobileOnly}`.trim()}
        aria-label="내비게이션 메뉴 열기"
        onClick={handleOpenMenu}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>

      {/* 내비게이션 애니메이션 */}
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
                  <a role="button" href="#sign-in" onClick={handleSignIn}>
                    Sign In
                  </a>
                </li>
                <li>
                  <a role="button" href="#sign-up" onClick={handleSignUp}>
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
                  <a role="button" href="#sign-out" onClick={handleSignOut}>
                    Sign Out
                  </a>
                </li>
              </>
            )}
          </ul>

          {/* 프로필 */}
          {isAuthed && children}

          {/* 모바일 내비게이션 메뉴 메뉴 닫기 버튼 */}
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
