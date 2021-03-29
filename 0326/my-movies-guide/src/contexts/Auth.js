import React from 'react'

/* -------------------------------------------------------------------------- */

// 인증 초깃값

const initialAuthUser = null

/* -------------------------------------------------------------------------- */

// 액션 타입

export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'

// 액션 크리에이터

export const signInAction = (authUser) => ({
  type: SIGN_IN,
  authUser,
})

export const signOutAction = () => ({
  type: SIGN_OUT,
})

// 인증 리듀서

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.authUser
    case SIGN_OUT:
      return initialAuthUser
    default:
      throw new Error(`전달된 ${action.type} 액션 타입은 처리할 수 없습니다.`)
  }
}

/* -------------------------------------------------------------------------- */

const AuthContext = React.createContext()

/* -------------------------------------------------------------------------- */

export const AuthProvider = (props) => {
  const [state, dispatch] = React.useReducer(authReducer, initialAuthUser)

  const provideValue = {
    state,
    dispatch,
  }

  return <AuthContext.Provider value={provideValue} {...props} />
}

/* -------------------------------------------------------------------------- */

// 커스텀 훅

export const useAuth = () => React.useContext(AuthContext)

/* -------------------------------------------------------------------------- */

// 고차 컴포넌트

export const withAuth = (Comp) => {
  class WithAuth extends React.Component {
    static contextType = AuthContext
    render() {
      return <Comp context={this.context} {...this.props} />
    }
  }
  return WithAuth
}
