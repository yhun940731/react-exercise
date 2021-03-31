/* reselect ----------------------------------------------------------------- */

import { createSelector } from 'reselect'

export const selectAuthState = (state) => state.auth

export const selectAuth = createSelector([selectAuthState], (auth) => auth)

/* action types ------------------------------------------------------------- */

const SIGN_IN = '로그인'
const SIGN_OUT = '로그아웃'

/* action creators ---------------------------------------------------------- */

export const signInAction = (currentUser) => ({
  type: SIGN_IN,
  authUser: currentUser,
})

export const signOutAction = () => ({ type: SIGN_OUT })

/* initial state + reducer -------------------------------------------------- */

const initialState = {
  authUser: null,
  isAuthed: false,
}

export const authReducer = (state = initialState, { type, authUser }) => {
  switch (type) {
    // 로그인
    case SIGN_IN:
      return {
        ...state,
        authUser,
        isAuthed: !!authUser,
      }

    // 로그아웃 (기본 처리)
    case SIGN_OUT:
      return initialState

    // 기본 (초기 상태)
    default:
      return state
  }
}
