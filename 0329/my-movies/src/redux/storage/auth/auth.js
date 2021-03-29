/* reselct ------------------------------------------------------------------ */
import { createSelector } from 'reselect'

const selectAuthState = (state) => state.auth

export const selectAuth = createSelector(
  [selectAuthState],
  (auth) => auth
)

/* action types ------------------------------------------------------------- */

const SIGN_IN = '로그인'
const SIGN_OUT = '로그아웃'

/* action creators ---------------------------------------------------------- */

export const signInAction = (authUser) => ({
  type: SIGN_IN,
  authUser,
})

export const signOutAction = () => ({
  type: SIGN_OUT,
})

/* initialState + reducer --------------------------------------------------- */

const initialState = {
  authUser: null,
  isAuthed: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        authUser: action.authUser,
        isAuthed: !!action.authUser,
      }
    case SIGN_OUT:
      return initialState
    default:
      return state
  }
}
