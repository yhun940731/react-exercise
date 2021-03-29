import React from 'react'

/* -------------------------------------------------------------------------- */
// 상태 관리
/* -------------------------------------------------------------------------- */

// 초깃값
const initialAuth = {
  authUser: null,
}

// 리듀서(함수)
const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        authUser: action.authUser,
      }
    case SIGN_OUT:
      return initialAuth
    default:
      throw new Error('요구되는 액션 타입이 존재하지 않습니다.')
  }
}
// 액션 타입
const SIGN_IN = '로그인'
const SIGN_OUT = '로그아웃'

// 액션(정보 객체) 크리에이터(생성)
// 누가 액션을 리듀서에 전달하는가?
// 디스패치(액션생성)
export const signInAction = (authUser) => ({
  type: SIGN_IN,
  authUser,
})

export const signOutAction = () => ({
  type: SIGN_OUT,
})

/* -------------------------------------------------------------------------- */

// 컨텍스트 객체 생성
const AuthContext = React.createContext()

// 컨텍스트 객체.공급자를 래핑(wrapping) 컴포넌트
export const AuthProvider = (props) => {
  const [state, dispatch] = React.useReducer(authReducer, initialAuth)

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
      {...props}
    />
  )
}

// 고차 컴포넌트 → 커스텀 HOC
// 컴포넌트 → 향상된 컴포넌트 반환
export const withAuth = (Comp) => {
  class WithAuth extends React.Component {
    static contextType = AuthContext
    render() {
      return <Comp context={this.context} {...this.props} />
    }
  }
  return WithAuth
}

// 컨텍스트 훅 활용 → 커스텀 훅
export const useAuth = () => React.useContext(AuthContext)
