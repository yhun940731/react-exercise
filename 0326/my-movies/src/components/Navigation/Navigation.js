import { NavLink, useLocation } from 'react-router-dom'
import { container, active } from './Navigation.module.scss'

/* -------------------------------------------------------------------------- */

// auth 컨텍스트의 값인 state를 통해 authUser를 가져와야 한다.
// 조건부 렌더링 활용 authUser가 null이 아니면?
// signOut 버튼, Profile 컴포넌트 렌더링
// authUser가 null이면?
// signIn, signUp 버튼 렌더링

// 로그인, 로그아웃 디스패치 (액션 크리에이터 활용)
import React from 'react'
import { useAuth, signInAction, signOutAction } from 'contexts'

export default function Navigation({ children }) {
  const {
    state: { authUser },
    dispatch,
  } = useAuth()

  const signIn = () =>
    dispatch(
      signInAction({
        displayName: '라라라라',
        email: 'lalalala@lala.la',
        photoURL: 'https://lala.com/lala.jpg',
      })
    )

  const signOut = () => dispatch(signOutAction())

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
        {!authUser ? (
          <>
            <li>
              <button type="button" onClick={signIn}>
                Sign In
              </button>
            </li>
            <li>
              <button type="button">Sign Up</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink activeClassName={active} to="/bookmark">
                Bookmark
              </NavLink>
            </li>
            <li>
              <button type="button" onClick={signOut}>
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
      {children}
    </nav>
  )
}
